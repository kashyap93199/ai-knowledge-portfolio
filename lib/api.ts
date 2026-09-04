import { NextResponse } from "next/server";
import { getSession } from "./auth";

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** Guard for admin-only endpoints. Returns null when authorized. */
export function requireAdmin(): NextResponse | null {
  const session = getSession();
  if (!session) {
    return fail("Unauthorized", 401);
  }
  return null;
}

/** Best-effort client IP for rate limiting (behind proxies and dev server). */
export function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}