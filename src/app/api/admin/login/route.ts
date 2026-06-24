import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { adminToken, ADMIN_COOKIE } from "@/lib/admin";

const SAFE_NEXT = ["/admin/leads", "/admin/content"];

/** Constant-time string compare (hash first so lengths always match). */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const nextRaw = String(form.get("next") || "/admin/leads");
  const next = SAFE_NEXT.includes(nextRaw) ? nextRaw : "/admin/leads";
  const token = adminToken();
  const expected = process.env.ADMIN_PASSWORD;

  if (!token || !expected || !safeEqual(password, expected)) {
    return NextResponse.redirect(new URL(`${next}?error=1`, req.url), { status: 303 });
  }

  const res = NextResponse.redirect(new URL(next, req.url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
