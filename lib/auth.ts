import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "./db";

const SESSION_COOKIE = "ai_portfolio_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET must be set to at least 16 characters.");
  }
  return secret;
}

/** Hash a password with scrypt and a random salt (format: salt:hash). */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/** Verify a password against a stored salt:hash string using a constant-time compare. */
export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

interface SessionPayload {
  username: string;
  role: string;
  exp: number;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** Create a signed session cookie for the admin. */
export function createSession(username: string, role: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      username,
      role,
      exp: Date.now() + SESSION_TTL_MS,
    } satisfies SessionPayload)
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

/** Verify a session token; returns the payload or null. */
export function verifySession(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionPayload;
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

/** Read the current session from the request cookies (server components / route handlers). */
export function getSession(): SessionPayload | null {
  const store = cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/** Set the session cookie on the response. */
export function setSessionCookie(token: string): void {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie(): void {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

/** Validate admin credentials against environment variables (length-safe compare). */
export function validateAdminCredentials(username: string, password: string): boolean {
  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;
  if (!envUser || !envPass) return false;
  const userBuf = Buffer.from(username);
  const userExpected = Buffer.from(envUser);
  const passBuf = Buffer.from(password);
  const passExpected = Buffer.from(envPass);
  const userOk = userBuf.length === userExpected.length && timingSafeEqual(userBuf, userExpected);
  const passOk = passBuf.length === passExpected.length && timingSafeEqual(passBuf, passExpected);
  return userOk && passOk;
}

/** Ensure an AdminUser row exists in the DB matching the environment credentials. */
export function syncAdminUser(): void {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "change-me-please";
  const existing = db.prepare("SELECT id FROM AdminUser WHERE username = ?").get(username) as
    | { id: number }
    | undefined;
  if (!existing) {
    db.prepare(
      "INSERT INTO AdminUser (username, passwordHash, role) VALUES (?, ?, 'admin')"
    ).run(username, hashPassword(password));
  }
}