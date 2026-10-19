// Builds a Markdown copy of every page in the sitemap, for AI crawlers and
// LLM tools (the llms.txt convention: /services/seo -> /services/seo.md,
// home -> /index.html.md). Reads the live site so the files match exactly
// what visitors see, CMS content included.
//
//   node scripts/build-md.mjs            (defaults to https://www.unexusai.com)
//   node scripts/build-md.mjs http://localhost:3000
//
// Re-run after publishing content changes, then commit public/**/*.md.
import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const ORIGIN = (process.argv[2] || "https://www.unexusai.com").replace(/\/$/, "");
const PUBLIC = path.join(process.cwd(), "public");

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
// Drop anything that isn't readable content.
td.remove(["script", "style", "noscript", "svg", "canvas", "form", "button", "iframe", "template"]);
// Visual-only widgets: mock UI, diagrams, animations, button rows, logo marquee.
const SKIP_ARIA = (n) => n.getAttribute("aria-hidden") === "true";
const SKIP = /\blx-(stage|leads?|serp|flow|railbar|progress|go|token|uxi-anchor|ctas|logos|chip)(\b|__)/;
td.addRule("skipVisual", {
  filter: (n) => n.nodeType === 1 && (SKIP_ARIA(n) || SKIP.test(n.getAttribute("class") || "")),
  replacement: () => "",
});
// Rotating headline lines: list them instead of running them together.
td.addRule("rotor", {
  filter: (n) => n.nodeType === 1 && /\blx-rotor\b/.test(n.getAttribute("class") || ""),
  replacement: (_c, n) => "\n\n" + [...n.childNodes].map((c) => c.textContent.trim()).filter(Boolean).join(" · ") + "\n\n",
});
// Stats strip: "10+ Years of Industry Experience" as a plain list.
td.addRule("stats", {
  filter: (n) => n.nodeType === 1 && /\blx-stats__in\b/.test(n.getAttribute("class") || ""),
  replacement: (_c, n) =>
    "\n\n" + [...n.childNodes].filter((d) => d.nodeType === 1).map((d) => "- " + [...d.childNodes].map((c) => c.textContent.trim()).filter(Boolean).join(" ")).join("\n") + "\n\n",
});
// Decorative images (empty alt) add nothing to a text copy.
td.addRule("decorativeImg", {
  filter: (n) => n.nodeName === "IMG" && !n.getAttribute("alt"),
  replacement: () => "",
});
// Make site links absolute so the file works out of context.
td.addRule("absLinks", {
  filter: (n) => n.nodeName === "A" && n.getAttribute("href"),
  replacement: (content, n) => {
    const text = content.trim();
    if (!text) return "";
    let href = n.getAttribute("href");
    if (href.startsWith("#")) return text;
    if (href.startsWith("/")) href = ORIGIN.replace(/^http:\/\/localhost:\d+/, "https://www.unexusai.com") + href;
    return `[${text}](${href})`;
  },
});
td.addRule("absImg", {
  filter: (n) => n.nodeName === "IMG" && n.getAttribute("alt"),
  replacement: (_c, n) => {
    let src = n.getAttribute("src") || "";
    const m = src.match(/[?&]url=([^&]+)/); // unwrap /_next/image?url=...
    if (m) src = decodeURIComponent(m[1]);
    if (src.startsWith("/")) src = "https://www.unexusai.com" + src;
    return `![${n.getAttribute("alt")}](${src})`;
  },
});

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** The page's <main> (nav, footer and chat widget live outside it). */
function mainHtml(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  let h = m ? m[0] : html;
  return h;
}

function tidy(md) {
  return md
    .replace(/ /g, " ")
    .replace(/\*\*([^*\n]+)\*\*(?=[^\s*.,:;)!?])/g, "**$1** ") // "**3.8×**Return" -> "**3.8×** Return"
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function outFiles(url) {
  const p = new URL(url).pathname.replace(/\/$/, "");
  if (!p) return ["index.html.md", "index.md"];
  return [`${p.slice(1)}.md`];
}

const sitemap = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace("https://www.unexusai.com", ORIGIN));

async function get(url) {
  for (let i = 0; ; i++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "unexus-md-builder" } });
      return { res, html: await res.text() };
    } catch (e) {
      if (i >= 3) throw e;
      await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
    }
  }
}

for (const url of urls) {
  const { res, html } = await get(url);
  if (!res.ok || /Vercel Security Checkpoint/.test(html)) {
    console.error(`SKIP ${url} (${res.status}${/Checkpoint/.test(html) ? ", security checkpoint" : ""})`);
    continue;
  }
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "");
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || "");
  const canonical = url.replace(ORIGIN, "https://www.unexusai.com");
  const body = tidy(td.turndown(mainHtml(html)));
  const md = `# ${title}\n\n> ${desc}\n\nSource: ${canonical}\n\n---\n\n${body}\n`;
  for (const f of outFiles(url)) {
    const dest = path.join(PUBLIC, f);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, md);
    console.log(`ok   /${f.replace(/\\/g, "/")}  (${Math.round(md.length / 1024)} KB)`);
  }
}
