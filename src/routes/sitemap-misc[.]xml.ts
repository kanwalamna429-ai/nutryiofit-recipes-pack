import { createFileRoute } from "@tanstack/react-router";

import { allSitemapPaths, sitemapResponse, sitemapSections } from "@/lib/sitemap-data";

export const Route = createFileRoute("/sitemap-misc.xml")({
  server: {
    handlers: {
      GET: async () => sitemapResponse(sitemapSections.misc),
    },
  },
});
