import { z } from "zod";
import { fail, ok } from "@/lib/api";
import { createSession, setSessionCookie, validateAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(256),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail("Invalid credentials", 401);

  const { username, password } = parsed.data;
  const valid = validateAdminCredentials(username, password);

  // Constant-ish timing: hash check runs regardless of username validity.
  if (!valid) return fail("Invalid username or password", 401);

  const token = createSession(username, "admin");
  setSessionCookie(token);

  return ok({ success: true, username });
}