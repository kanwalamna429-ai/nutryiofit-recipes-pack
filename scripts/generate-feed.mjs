#!/usr/bin/env node
// Generates public/feed.xml from public/blog/*/index.html and public/recipes/*/index.html
// Runs automatically on prebuild so new posts/recipes are included.
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://nutryio.fit";
const PUBLIC = "public";
const OUT = join(PUBLIC, "feed.xml");

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function meta(html, prop) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']*)["']`,
    "i"
  );
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${prop}["']`,
    "i"
  );
  const m2 = html.match(re2);
  return m2 ? m2[1] : "";
}

function getTitle(html) {
  return (
    meta(html, "og:title") ||
    (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "")
  );
}

function getDescription(html) {
  return meta(html, "description") || meta(html, "og:description") || "";
}

function getDate(html, fallback) {
  const json = html.match(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (json) {
    const d = json[1].match(/"datePublished"\s*:\s*"([^"]+)"/);
    if (d) return new Date(d[1]).toUTCString();
    const m = json[1].match(/"dateModified"\s*:\s*"([^"]+)"/);
    if (m) return new Date(m[1]).toUTCString();
  }
  const pub = meta(html, "article:published_time");
  if (pub) return new Date(pub).toUTCString();
  return new Date(fallback).toUTCString();
}

function getImage(html) {
  const img = meta(html, "og:image") || meta(html, "twitter:image") || "";
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return SITE + (img.startsWith("/") ? img : "/" + img);
}

function collect(dir, urlPrefix) {
  const base = join(PUBLIC, dir);
  if (!existsSync(base)) return [];
  const items = [];
  for (const slug of readdirSync(base)) {
    const p = join(base, slug, "index.html");
    if (!existsSync(p)) continue;
    const html = readFileSync(p, "utf8");
    const title = getTitle(html);
    if (!title) continue;
    const stat = statSync(p);
    items.push({
      title,
      link: `${SITE}${urlPrefix}/${slug}`,
      description: getDescription(html),
      pubDate: getDate(html, stat.mtime),
      image: getImage(html),
      _sort: stat.mtime.getTime(),
    });
  }
  return items;
}

const items = [
  ...collect("blog", "/blog"),
  ...collect("recipes", "/recipes"),
].sort((a, b) => b._sort - a._sort);

const now = new Date().toUTCString();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Nutryio</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Healthy recipes, nutrition guides, and fitness tips from Nutryio.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
${items
  .map(
    (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${esc(it.link)}</link>
      <guid isPermaLink="true">${esc(it.link)}</guid>
      <description>${esc(it.description)}</description>
      <pubDate>${it.pubDate}</pubDate>${
      it.image
        ? `\n      <enclosure url="${esc(it.image)}" type="image/jpeg" />`
        : ""
    }
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(OUT, xml);
console.log(`Wrote ${OUT} with ${items.length} items`);
