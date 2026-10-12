// WordPasture ESV relay (a Cloudflare Worker).
// The app asks this relay for one chapter at a time; the relay adds your private ESV API key and asks Crossway.
// The key stays here (as a secret), never in the app, as Crossway's terms require.
//
// Settings in the Cloudflare dashboard (Worker → Settings → Variables and Secrets):
//   ESV_KEY          (Secret)  your key from https://api.esv.org
//   ALLOWED_ORIGINS  (Text)    where the app lives, e.g. https://yourname.github.io  (several: comma-separated)

const PARAMS = {
  "include-passage-references": "false", "include-verse-numbers": "true", "include-first-verse-numbers": "true",
  "include-footnotes": "false", "include-footnote-body": "false", "include-headings": "false",
  "include-short-copyright": "false", "include-copyright": "false", "include-passage-horizontal-lines": "false",
  "include-heading-horizontal-lines": "false", "include-selahs": "true", "indent-using": "space",
  "indent-paragraphs": "2", "indent-poetry": "true", "indent-poetry-lines": "4", "indent-declares": "40",
  "indent-psalm-doxology": "30", "line-length": "0"
};

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
    const ok = allowed.includes(origin);
    const cors = { "Access-Control-Allow-Origin": ok ? origin : (allowed[0] || ""), "Vary": "Origin" };
    if (req.method === "OPTIONS") return new Response(null, { headers: { ...cors, "Access-Control-Allow-Methods": "GET", "Access-Control-Max-Age": "86400" } });
    if (req.method !== "GET" || !ok) return new Response("Not allowed", { status: 403, headers: cors });
    // one whole chapter only, e.g. "Matthew 1", "1 John 3", "Song of Solomon 2"
    const q = (new URL(req.url).searchParams.get("q") || "").trim();
    if (!/^[1-3]?\s?[A-Za-z][A-Za-z ]{1,24} \d{1,3}$/.test(q)) return new Response("Ask for one chapter, like Matthew 1", { status: 400, headers: cors });
    const u = new URL("https://api.esv.org/v3/passage/text/");
    u.searchParams.set("q", q);
    for (const [k, v] of Object.entries(PARAMS)) u.searchParams.set(k, v);
    const r = await fetch(u, { headers: { Authorization: "Token " + env.ESV_KEY } });
    return new Response(r.body, { status: r.status, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" } });
  }
};
