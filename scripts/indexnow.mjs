// Tells Bing (and through it Copilot, Yandex, Seznam…) that pages changed, so
// new articles are picked up in hours instead of days. https://www.indexnow.org
//
//   npm run indexnow                       -> every URL in the sitemap
//   npm run indexnow -- /blog/new-post     -> just these paths
//
// The key is public by design: it's served at /<key>.txt to prove ownership.
const KEY = "332c3c92a2ffc1ba811b98d25cb0efd5";
const HOST = "www.unexusai.com";
const ORIGIN = `https://${HOST}`;

let paths = process.argv.slice(2);
let urls;
if (paths.length) {
  urls = paths.map((p) => (p.startsWith("http") ? p : ORIGIN + (p.startsWith("/") ? p : "/" + p)));
} else {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (res.status >= 400) process.exitCode = 1;
