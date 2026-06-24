import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdminAuthed } from "@/lib/admin";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"];

/**
 * Client-upload token endpoint. The browser uploads the file directly to Blob
 * storage (so we're not bound by the 4.5 MB serverless request-body limit);
 * this route only issues a short-lived, auth-gated token.
 */
export async function POST(request: Request): Promise<NextResponse> {
  // Reject unauthenticated callers up front (defence in depth — the token
  // callback also checks, but this avoids any processing before auth).
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image upload isn't set up yet. Connect a Vercel Blob store, or paste an image URL instead." },
      { status: 400 },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdminAuthed())) throw new Error("Unauthorized");
        return {
          allowedContentTypes: ALLOWED,
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024,
        };
      },
      // Required by the API; nothing to persist on our side.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
