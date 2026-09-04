import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { fail, getClientIp, ok } from "@/lib/api";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(150),
  message: z.string().trim().min(10).max(5000),
});

// --- Simple in-memory rate limiting: 5 messages per 10 minutes per IP ---
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissions = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function appendToLog(entry: Record<string, string>): void {
  try {
    const dir = path.join(process.cwd(), "data");
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(
      path.join(dir, "contact-messages.log"),
      JSON.stringify(entry) + "\n",
      "utf8"
    );
  } catch {
    // Logging is best-effort; never fail the request because of it.
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return fail(firstIssue?.message ?? "Validation failed", 422);
  }

  const ip = getClientIp(request);
  if (rateLimited(ip)) {
    return fail("Too many messages — please wait a few minutes and try again.", 429);
  }

  const { name, email, subject, message } = parsed.data;

  try {
    db.prepare(
      "INSERT INTO ContactMessage (name, email, subject, message, status) VALUES (?, ?, ?, ?, 'new')"
    ).run(name, email, subject, message);
  } catch (error) {
    console.error("Failed to store contact message:", error);
    return fail("Could not store your message. Please try again later.", 500);
  }

  appendToLog({ name, email, subject, receivedAt: new Date().toISOString() });

  return ok(
    { success: true, message: "Message received. Thank you!" },
    201
  );
}