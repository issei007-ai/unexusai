import type { NextConfig } from "next";

// Content Security Policy. 'unsafe-inline' is kept for scripts/styles because
// the app relies on Next's inline bootstrap scripts and many inline style
// attributes (a nonce-based strict policy would need middleware). The other
// directives still meaningfully restrict origins, framing, and injection.
// React dev mode needs full eval() for its debugging tooling; production never
// does. Both environments need WebAssembly (the Draco mesh decoder for the 3D
// mascot), so production gets the narrow 'wasm-unsafe-eval' — which permits
// only WebAssembly compilation, not arbitrary JS eval.
const isDev = process.env.NODE_ENV === "development";

// Google marketing origins that serve/execute code. Covers GTM plus Google Ads
// conversion tracking & remarketing, so ad campaigns work the moment they run
// without further CSP edits. Pixel/beacon hits (images, fetch/beacon) are
// already covered by the wide img-src/connect-src https: allowances below.
const googleScriptSrc =
  "https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com";
const googleFrameSrc =
  "https://www.googletagmanager.com https://td.doubleclick.net https://googleads.g.doubleclick.net https://www.google.com";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${googleScriptSrc} ${isDev ? "'unsafe-eval'" : "'wasm-unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  // blob:/data: needed for Three.js GLTFLoader, which fetches the textures it
  // unpacks from .glb files as blob: URLs.
  "connect-src 'self' https: blob: data:",
  // The Draco mesh decoder runs in a worker created from a blob: URL.
  "worker-src 'self' blob:",
  // GTM's <noscript> tag and the Google Ads conversion linker / remarketing
  // tags load in iframes.
  `frame-src 'self' ${googleFrameSrc}`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Baseline security headers applied to every response.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
