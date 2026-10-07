import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";

export default defineConfig({
  plugins: [
    {
      name: "static-directory-preview",
      configureServer(server) {
        const publicRoot = resolve(server.config.root, "public");
        server.middlewares.use((req, _res, next) => {
          if (req.method !== "GET" && req.method !== "HEAD") return next();
          const [pathname, query] = (req.url || "/").split("?", 2);
          let decoded: string;
          try {
            decoded = decodeURIComponent(pathname);
          } catch {
            return next();
          }
          const candidate = resolve(publicRoot, "." + decoded, "index.html");
          if (candidate.startsWith(publicRoot + sep) && existsSync(candidate) && statSync(candidate).isFile()) {
            req.url = decoded.replace(/\/$/, "") + "/index.html" + (query === undefined ? "" : "?" + query);
          }
          next();
        });
      },
    },
    react(),
  ],
});
