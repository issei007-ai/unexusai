import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/admin";
import { setSection } from "@/lib/cms";
import { getSectionSchema } from "@/lib/cms-schema";

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { key?: string; value?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const key = typeof body.key === "string" ? body.key : "";
  if (!getSectionSchema(key)) {
    return NextResponse.json({ ok: false, error: "Unknown section" }, { status: 400 });
  }
  if (typeof body.value !== "object" || body.value === null || Array.isArray(body.value)) {
    return NextResponse.json({ ok: false, error: "Bad value" }, { status: 400 });
  }

  try {
    await setSection(key, body.value as Record<string, unknown>);
    revalidatePath("/", "layout"); // content can appear on any page
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
