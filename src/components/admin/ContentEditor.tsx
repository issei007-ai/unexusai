"use client";
import { useState } from "react";
import { upload } from "@vercel/blob/client";
import type { CmsSection, CmsField } from "@/lib/cms-schema";

type Dict = Record<string, unknown>;
type ItemForm = Record<string, string>;
type FieldVal = string | ItemForm[];
type SectionForm = Record<string, FieldVal>;

function fieldToForm(field: CmsField, v: unknown): FieldVal {
  if (field.type === "list") return Array.isArray(v) ? v.join("\n") : String(v ?? "");
  if (field.type === "items") {
    const arr = Array.isArray(v) ? v : [];
    return arr.map((item) => itemToForm(field, item as Dict));
  }
  return v == null ? "" : String(v);
}

function itemToForm(field: CmsField, item: Dict): ItemForm {
  const o: ItemForm = {};
  for (const sf of field.itemFields ?? []) {
    const sv = item?.[sf.name];
    o[sf.name] = sf.type === "list" ? (Array.isArray(sv) ? sv.join("\n") : String(sv ?? "")) : String(sv ?? "");
  }
  return o;
}

function blankItem(field: CmsField): ItemForm {
  const o: ItemForm = {};
  for (const sf of field.itemFields ?? []) o[sf.name] = "";
  return o;
}

function toForm(section: CmsSection, override?: Dict): SectionForm {
  const merged = { ...section.defaults, ...(override || {}) };
  const f: SectionForm = {};
  for (const field of section.fields) f[field.name] = fieldToForm(field, merged[field.name]);
  return f;
}

function listToArray(s: string): string[] {
  return s.split("\n").map((x) => x.trim()).filter(Boolean);
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed");
      // Browser uploads straight to Blob storage — no 4.5 MB request-body limit.
      const blob = await upload(`uploads/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: true,
      });
      onChange(blob.url);
    } catch (er) {
      setErr(er instanceof Error ? er.message : "Upload failed");
    }
    setUploading(false);
    e.target.value = "";
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <input className="form-input" placeholder="Paste image URL, or upload →" value={value} onChange={(e) => onChange(e.target.value)} style={{ flex: 1 }} />
        <label className="btn btn-secondary btn-sm" style={{ cursor: "pointer", flexShrink: 0 }}>
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </label>
      </div>
      <p className="text-xs mt-1" style={{ color: "var(--color-brand-500)" }}>
        Tip: keep cover images around 1500px wide and under ~500&nbsp;KB so pages load fast. Max 25&nbsp;MB.
      </p>
      {err && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{err}</p>}
      {value && <img src={value} alt="" style={{ marginTop: 8, maxHeight: 80, borderRadius: 8, border: "1px solid var(--color-border)" }} />}
    </div>
  );
}

export default function ContentEditor({ sections, content }: { sections: CmsSection[]; content: Record<string, Dict> }) {
  const [activeKey, setActiveKey] = useState(sections[0]?.key ?? "");
  const active = sections.find((s) => s.key === activeKey) ?? sections[0];
  const [form, setForm] = useState<SectionForm>(() => toForm(active, content[active.key]));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<null | "saved" | "error">(null);

  function selectSection(key: string) {
    const s = sections.find((x) => x.key === key);
    if (!s) return;
    setActiveKey(key);
    setForm(toForm(s, content[key]));
    setStatus(null);
  }

  function setText(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }
  function setItemField(name: string, idx: number, sub: string, value: string) {
    setForm((f) => {
      const items = [...(f[name] as ItemForm[])];
      items[idx] = { ...items[idx], [sub]: value };
      return { ...f, [name]: items };
    });
  }
  function addItem(field: CmsField) {
    setForm((f) => ({ ...f, [field.name]: [...(f[field.name] as ItemForm[]), blankItem(field)] }));
  }
  function removeItem(name: string, idx: number) {
    setForm((f) => ({ ...f, [name]: (f[name] as ItemForm[]).filter((_, i) => i !== idx) }));
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    const value: Dict = {};
    for (const field of active.fields) {
      const v = form[field.name];
      if (field.type === "list") {
        value[field.name] = listToArray(v as string);
      } else if (field.type === "items") {
        value[field.name] = (v as ItemForm[]).map((item) => {
          const o: Dict = {};
          for (const sf of field.itemFields ?? []) {
            o[sf.name] = sf.type === "list" ? listToArray(item[sf.name] || "") : (item[sf.name] || "").trim();
          }
          return o;
        });
      } else {
        value[field.name] = (v as string).trim();
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

        <div className="space-y-5">
          {active.fields.map((field) => (
            <div key={field.name}>
              <label className="form-label">{field.label}</label>

              {field.type === "text" && (
                <input className="form-input" value={(form[field.name] as string) ?? ""} onChange={(e) => setText(field.name, e.target.value)} />
              )}

              {field.type === "image" && (
                <ImageField value={(form[field.name] as string) ?? ""} onChange={(v) => setText(field.name, v)} />
              )}

              {(field.type === "textarea" || field.type === "list") && (
                <textarea className="form-textarea" rows={field.type === "list" ? 5 : 3} value={(form[field.name] as string) ?? ""} onChange={(e) => setText(field.name, e.target.value)} />
              )}

              {field.type === "items" && (
                <div className="space-y-3">
                  {(form[field.name] as ItemForm[]).map((item, idx) => (
                    <div key={idx} className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)" }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs" style={{ color: "var(--color-brand-500)" }}>#{idx + 1}</span>
                        <button type="button" onClick={() => removeItem(field.name, idx)} className="text-xs" style={{ color: "#f87171" }}>Remove</button>
                      </div>
                      <div className="space-y-2.5">
                        {(field.itemFields ?? []).map((sf) => (
                          <div key={sf.name}>
                            <label className="text-xs" style={{ color: "var(--color-brand-400)" }}>{sf.label}</label>
                            {sf.type === "image" ? (
                              <ImageField value={item[sf.name] ?? ""} onChange={(v) => setItemField(field.name, idx, sf.name, v)} />
                            ) : sf.type === "text" ? (
                              <input className="form-input" style={{ fontSize: "0.85rem", padding: "0.5rem 0.7rem" }} value={item[sf.name] ?? ""} onChange={(e) => setItemField(field.name, idx, sf.name, e.target.value)} />
                            ) : (
                              <textarea className="form-textarea" rows={sf.type === "list" ? 4 : 2} style={{ fontSize: "0.85rem", padding: "0.5rem 0.7rem", minHeight: 0 }} value={item[sf.name] ?? ""} onChange={(e) => setItemField(field.name, idx, sf.name, e.target.value)} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addItem(field)} className="btn btn-secondary btn-sm">+ Add {field.itemLabel ?? "item"}</button>
                </div>
              )}

              {field.help && <p className="text-xs mt-1" style={{ color: "var(--color-brand-500)" }}>{field.help}</p>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-7">
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
