import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminAuthed } from "@/lib/admin";

export async function POST(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Image upload isn't set up yet. Connect a Vercel Blob store, or paste an image URL instead." },
      { status: 400 },
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Image must be under 8 MB" }, { status: 400 });
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const blob = await put(`uploads/${Date.now()}-${safeName}`, file, { access: "public" });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
