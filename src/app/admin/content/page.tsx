import { cookies } from "next/headers";
import { adminToken, ADMIN_COOKIE } from "@/lib/admin";
import { getAllSections, cmsConfigured } from "@/lib/cms";
import { SECTIONS } from "@/lib/cms-schema";
import ContentEditor from "@/components/admin/ContentEditor";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Content — Admin",
  robots: { index: false, follow: false },
};

export default async function ContentAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const token = adminToken();
  const store = await cookies();
  const authed = !!token && store.get(ADMIN_COOKIE)?.value === token;

  if (!token) {
    return (
      <Shell>
        <Notice>
          The CMS is locked. Set an <code>ADMIN_PASSWORD</code> environment variable to enable it.
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
            <input type="hidden" name="next" value="/admin/content" />
            <input className="form-input" type="password" name="password" placeholder="Password" autoFocus required />
            <button type="submit" className="btn btn-primary btn-lg w-full">Sign in</button>
            {error && <p className="text-xs text-center" style={{ color: "#f87171" }}>Wrong password. Try again.</p>}
          </form>
        </div>
      </Shell>
    );
  }

  if (!cmsConfigured()) {
    return (
      <Shell>
        <Notice>
          The CMS needs the database. Set <code>NEON_DATABASE_URL</code> to start editing content.
        </Notice>
      </Shell>
    );
  }

  const content = await getAllSections();

  return (
    <Shell>
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-h2" style={{ fontFamily: "var(--font-display)" }}>Content</h1>
          <p className="text-sm" style={{ color: "var(--color-brand-400)" }}>Edit the site section by section. Saved changes go live within a moment.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/admin/leads" className="btn btn-secondary btn-sm">Leads</a>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="btn btn-secondary btn-sm">Sign out</button>
          </form>
        </div>
      </div>
      <ContentEditor sections={SECTIONS} content={content} />
    </Shell>
  );
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
