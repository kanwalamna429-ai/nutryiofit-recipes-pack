#!/usr/bin/env node
/**
 * generate-sitemap.mjs
 *
 * Automatic sitemap + robots.txt generator for the Nutryio Fit static site.
 *
 * How it works:
 *  1. Scans `public/` recursively for every `index.html` file.
 *  2. Converts each file path into a clean canonical URL (no `.html`, trailing `/`).
 *  3. De-duplicates, then writes:
 *       - public/sitemap.xml   (UTF-8, application/xml, direct URL set under 50k URLs)
 *       - public/robots.txt    (with Sitemap directive)
 *
 * This runs automatically before every build via the `prebuild` npm script,
 * so both local builds and Cloudflare Pages deployments get a fresh sitemap.
 * The files are emitted into `public/` so Vite copies them into the final
 * build output (`dist/` -> served at the site root).
 *
 * Most builds produce one direct /sitemap.xml containing all URLs, which is
 * the simplest and most reliable format for Google Search Console. If the
 * site grows beyond 50,000 URLs, the `sitemap` package automatically switches
 * to a sitemap index plus sitemap-N.xml shards to stay within protocol limits.
 */
import { SitemapAndIndexStream, SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "node:fs";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { resolve, dirname, relative, sep, posix } from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";

const HOSTNAME = "https://nutryio.fit";
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = resolve(ROOT, "public");

// Files / folders we never want in the sitemap.
const IGNORE = [
  "**/node_modules/**",
  "**/_headers",
  "**/_redirects",
  "**/404.html",
];

/** Convert a public/-relative html file path into a clean canonical URL path. */
function fileToUrlPath(relPath) {
  const posixPath = relPath.split(sep).join(posix.sep);
  // /foo/index.html -> /foo/   ;   /index.html -> /
  if (posixPath === "index.html") return "/";
  if (posixPath.endsWith("/index.html")) {
    return "/" + posixPath.slice(0, -"index.html".length);
  }
  // /foo.html -> /foo
  if (posixPath.endsWith(".html")) {
    return "/" + posixPath.slice(0, -".html".length);
  }
  return "/" + posixPath;
}

async function collectUrls() {
  const files = await fg(["**/*.html"], {
    cwd: PUBLIC_DIR,
    ignore: IGNORE,
    dot: false,
  });

  const seen = new Set();
  const urls = [];
  for (const f of files) {
    const url = fileToUrlPath(f);
    if (seen.has(url)) continue;
    seen.add(url);

    // Tweak priority/changefreq by section.
    let priority = 0.6;
    let changefreq = "monthly";
    if (url === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (url.startsWith("/blog")) {
      priority = url === "/blog/" ? 0.9 : 0.7;
      changefreq = "weekly";
    } else if (url.startsWith("/calculators")) {
      priority = 0.8;
      changefreq = "monthly";
    } else if (url.startsWith("/recipes")) {
      priority = 0.7;
      changefreq = "monthly";
    }

    urls.push({ url, changefreq, priority, lastmod: new Date().toISOString() });
  }

  // Stable sort for diff-friendly output.
  urls.sort((a, b) => a.url.localeCompare(b.url));
  return urls;
}

async function writeSitemap(urls) {
  // Clean any previously generated sub-sitemaps so old ones don't linger.
  await rm(resolve(PUBLIC_DIR, "sitemap-0.xml"), { force: true });
  for (let i = 0; i < 20; i++) {
    await rm(resolve(PUBLIC_DIR, `sitemap-${i}.xml`), { force: true });
  }

  await mkdir(PUBLIC_DIR, { recursive: true });

  // SitemapAndIndexStream auto-splits at 50k URLs (the sitemaps.org limit).
  // For our current ~2.5k URLs it produces a single sitemap-0.xml plus an
  // index at sitemap.xml. Both are valid for Google Search Console.
  const sms = new SitemapAndIndexStream({
    limit: 50000,
    getSitemapStream: (i) => {
      const sitemapPath = `sitemap-${i}.xml`;
      const sitemapStream = new SitemapStream({ hostname: HOSTNAME });
      const writeStream = createWriteStream(resolve(PUBLIC_DIR, sitemapPath));
      sitemapStream.pipe(writeStream);
      return [
        new URL(`/${sitemapPath}`, HOSTNAME).toString(),
        sitemapStream,
        writeStream,
      ];
    },
  });

  const indexWrite = createWriteStream(resolve(PUBLIC_DIR, "sitemap.xml"));
  sms.pipe(indexWrite);

  for (const u of urls) sms.write(u);
  sms.end();

  await new Promise((res, rej) => {
    indexWrite.on("finish", res);
    indexWrite.on("error", rej);
  });
}

async function writeRobots() {
  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${HOSTNAME}/sitemap.xml`,
    "",
  ].join("\n");
  await writeFile(resolve(PUBLIC_DIR, "robots.txt"), robots, "utf8");
}

async function main() {
  const urls = await collectUrls();
  await writeSitemap(urls);
  await writeRobots();
  console.log(
    `[sitemap] ${urls.length} URLs written to public/sitemap.xml (+ sitemap-N.xml shards)`,
  );
}

main().catch((err) => {
  console.error("[sitemap] generation failed:", err);
  process.exit(1);
});
