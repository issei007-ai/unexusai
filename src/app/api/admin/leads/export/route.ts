import { NextResponse } from "next/server";
import { isAdminAuthed, fetchLeads, leadsToCsv, safeDate } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isAdminAuthed())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source") || undefined;
  const type = searchParams.get("type") || undefined;
  const from = safeDate(searchParams.get("from") || undefined);
  const to = safeDate(searchParams.get("to") || undefined);

  const { rows } = await fetchLeads({ source, type, from, to, limit: 5000, offset: 0 });
  const csv = leadsToCsv(rows);

  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
