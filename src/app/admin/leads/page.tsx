import { cookies } from "next/headers";
import { adminToken, ADMIN_COOKIE, dbConfigured, fetchLeads, type LeadRow } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Leads — Admin",
  robots: { index: false, follow: false },
};

export default async function LeadsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const token = adminToken();
  const cookieStore = await cookies();
  const authed = !!token && cookieStore.get(ADMIN_COOKIE)?.value === token;

  if (!token) {
    return (
      <Shell>
        <Notice>
          The admin area is locked. Set an <code>ADMIN_PASSWORD</code> environment variable to enable it.
        </Notice>
      </Shell>
    );
  }

  if (!authed) {
    return (
      <Shell>
        <div className="glow-card p-8 mx-auto" style={{ border: "1px solid var(--color-border)", maxWidth: "22rem" }}>
          <h1 className="text-h3 mb-5" style={{ fontFamily: "var(--font-display)" }}>Admin sign-in</h1>
          <form action="/api/admin/login" method="POST" className="space-y-4">
            <input className="form-input" type="password" name="password" placeholder="Password" autoFocus required />
            <button type="submit" className="btn btn-primary btn-lg w-full">Sign in</button>
            {error && (
              <p className="text-xs text-center" style={{ color: "#f87171" }}>Wrong password. Try again.</p>
            )}
          </form>
        </div>
      </Shell>
    );
  }

  let leads: LeadRow[] = [];
  let loadError: string | null = null;
  if (dbConfigured()) {
    try {
      leads = await fetchLeads();
    } catch (e) {
      loadError = e instanceof Error ? e.message : String(e);
    }
  }

  return (
    <Shell>
      <div className="flex items-center justify-between gap-4 mb-7 flex-wrap">
        <div>
          <h1 className="text-h2" style={{ fontFamily: "var(--font-display)" }}>Leads</h1>
          <p className="text-sm" style={{ color: "var(--color-brand-400)" }}>
            {dbConfigured() ? `${leads.length} most recent` : "Database channel not configured"}
          </p>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="btn btn-secondary btn-sm">Sign out</button>
        </form>
      </div>

      {!dbConfigured() && (
        <Notice>
          Leads are only listed here when the Supabase channel is on. Set <code>SUPABASE_URL</code> and{" "}
          <code>SUPABASE_SERVICE_KEY</code> to start storing and viewing them.
        </Notice>
      )}

      {loadError && <Notice>Couldn&apos;t load leads: {loadError}</Notice>}

      {dbConfigured() && !loadError && leads.length === 0 && (
        <Notice>No leads yet. They&apos;ll show up here as forms get submitted.</Notice>
      )}

      {leads.length > 0 && (
        <div className="glow-card" style={{ border: "1px solid var(--color-border)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--color-brand-400)" }}>
                <Th>When</Th>
                <Th>Type</Th>
                <Th>Source</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Details</Th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} style={{ borderTop: "1px solid var(--color-border)", verticalAlign: "top" }}>
                  <Td muted nowrap>{formatWhen(lead.created_at)}</Td>
                  <Td><span className="lead-tag">{lead.type ?? "—"}</span></Td>
                  <Td muted>{lead.source ?? "—"}</Td>
                  <Td>{lead.name ?? "—"}</Td>
                  <Td>
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} style={{ color: "var(--color-accent-300)" }}>{lead.email}</a>
                    ) : "—"}
                  </Td>
                  <Td>
                    <div className="flex flex-col gap-1">
                      {Object.entries(lead.fields ?? {}).map(([k, v]) => (
                        <span key={k} style={{ color: "var(--color-brand-200)" }}>
                          <span style={{ color: "var(--color-brand-500)" }}>{k}:</span> {v}
                        </span>
                      ))}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

function formatWhen(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: "72rem" }}>{children}</div>
    </main>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="glow-card p-6 text-sm" style={{ border: "1px solid var(--color-border)", color: "var(--color-brand-300)" }}>
      {children}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: "0.8rem 1rem", fontWeight: 600, whiteSpace: "nowrap" }}>{children}</th>;
}

function Td({ children, muted, nowrap }: { children: React.ReactNode; muted?: boolean; nowrap?: boolean }) {
  return (
    <td style={{ padding: "0.8rem 1rem", color: muted ? "var(--color-brand-400)" : "#fff", whiteSpace: nowrap ? "nowrap" : "normal" }}>
      {children}
    </td>
  );
}
