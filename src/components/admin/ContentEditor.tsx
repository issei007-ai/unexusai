"use client";
import { useState } from "react";
import type { CmsSection } from "@/lib/cms-schema";

type Dict = Record<string, unknown>;

function toForm(section: CmsSection, override?: Dict): Record<string, string> {
  const merged = { ...section.defaults, ...(override || {}) };
  const f: Record<string, string> = {};
  for (const field of section.fields) {
    const v = merged[field.name];
    if (field.type === "list") f[field.name] = Array.isArray(v) ? v.join("\n") : String(v ?? "");
    else f[field.name] = v == null ? "" : String(v);
  }
  return f;
}

export default function ContentEditor({ sections, content }: { sections: CmsSection[]; content: Record<string, Dict> }) {
  const [activeKey, setActiveKey] = useState(sections[0]?.key ?? "");
  const active = sections.find((s) => s.key === activeKey) ?? sections[0];
  const [form, setForm] = useState<Record<string, string>>(() => toForm(active, content[active.key]));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<null | "saved" | "error">(null);

  function selectSection(key: string) {
    const s = sections.find((x) => x.key === key);
    if (!s) return;
    setActiveKey(key);
    setForm(toForm(s, content[key]));
    setStatus(null);
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    const value: Dict = {};
    for (const field of active.fields) {
      if (field.type === "list") {
        value[field.name] = (form[field.name] || "").split("\n").map((s) => s.trim()).filter(Boolean);
      } else {
        value[field.name] = (form[field.name] || "").trim();
      }
    }
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: active.key, value }),
      });
      if (!res.ok) throw new Error();
      content[active.key] = value;
      setStatus("saved");
    } catch {
      setStatus("error");
    }
    setSaving(false);
  }

  const groups = Array.from(new Set(sections.map((s) => s.group)));

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-6">
      {/* Section list */}
      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g}>
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--color-brand-500)" }}>{g}</div>
            <div className="space-y-1">
              {sections.filter((s) => s.group === g).map((s) => {
                const isActive = s.key === activeKey;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => selectSection(s.key)}
                    className="block w-full text-left text-sm rounded-md px-3 py-2 transition-colors"
                    style={{
                      background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                      color: isActive ? "#fff" : "var(--color-brand-300)",
                      border: isActive ? "1px solid var(--color-accent-700)" : "1px solid transparent",
                    }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="glow-card p-7" style={{ border: "1px solid var(--color-border)" }}>
        <h2 className="text-h3 mb-1" style={{ fontFamily: "var(--font-display)" }}>{active.group} · {active.label}</h2>
        <p className="text-xs mb-6" style={{ color: "var(--color-brand-500)" }}>Section key: {active.key}</p>

        <div className="space-y-4">
          {active.fields.map((field) => (
            <div key={field.name}>
              <label className="form-label">{field.label}</label>
              {field.type === "text" ? (
                <input
                  className="form-input"
                  value={form[field.name] ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                />
              ) : (
                <textarea
                  className="form-textarea"
                  rows={field.type === "list" ? 5 : 3}
                  value={form[field.name] ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, [field.name]: e.target.value }))}
                />
              )}
              {field.help && <p className="text-xs mt-1" style={{ color: "var(--color-brand-500)" }}>{field.help}</p>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6">
          <button type="button" onClick={save} disabled={saving} className="btn btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {status === "saved" && <span className="text-sm" style={{ color: "var(--color-success)" }}>Saved — live in a moment.</span>}
          {status === "error" && <span className="text-sm" style={{ color: "#f87171" }}>Couldn&apos;t save. Try again.</span>}
        </div>
      </div>
    </div>
  );
}
