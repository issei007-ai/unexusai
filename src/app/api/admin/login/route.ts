import { NextResponse } from "next/server";
import { adminToken, ADMIN_COOKIE } from "@/lib/admin";

const SAFE_NEXT = ["/admin/leads", "/admin/content"];

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const nextRaw = String(form.get("next") || "/admin/leads");
  const next = SAFE_NEXT.includes(nextRaw) ? nextRaw : "/admin/leads";
  const token = adminToken();

  if (!token || password !== process.env.ADMIN_PASSWORD) {
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
