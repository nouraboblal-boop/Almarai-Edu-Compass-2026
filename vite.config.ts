import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin, ResolvedConfig } from "vite";

/**
 * Matches TanStack Start env names (@tanstack/start-plugin-core/constants).
 */
const CLIENT_ENV = "client";
const SERVER_ENV = "ssr";

/** Resolve asset URLs for index.html — must match vite `base` (e.g. `./` → relative `./assets/...`). */
function assetHref(config: ResolvedConfig, fileName: string): string {
  const rel = fileName.replace(/^\//, "");
  const b = config.base;
  if (b === "./" || b === ".") {
    return `./${rel}`;
  }
  if (!b || b === "/") {
    return `/${rel}`;
  }
  const prefix = b.endsWith("/") ? b.slice(0, -1) : b;
  return `${prefix}/${rel}`;
}

/** Writes `index.html` to the client outDir root (not under `assets/`). */
function emitClientRootIndexHtml(): Plugin {
  let config!: ResolvedConfig;

  return {
    name: "emit-client-root-index-html",
    apply: "build",
    applyToEnvironment: (env) => env.name === CLIENT_ENV,
    configResolved(resolved) {
      config = resolved;
    },
    writeBundle(options, bundle) {
      const outDir = options.dir;
      if (!outDir) return;

      let entryFile: string | undefined;
      const styleFiles = new Set<string>();

      for (const output of Object.values(bundle)) {
        if (output.type === "chunk" && output.isEntry) {
          entryFile = output.fileName;
          const imported = output.viteMetadata?.importedCss;
          if (imported) {
            for (const id of imported) styleFiles.add(id);
          }
        }
        if (output.type === "asset" && output.fileName.endsWith(".css")) {
          styleFiles.add(output.fileName);
        }
      }

      if (!entryFile) return;

      const cssTags = [...styleFiles]
        .sort()
        .map((href) => `    <link rel="stylesheet" crossorigin href="${assetHref(config, href)}">`)
        .join("\n");

      const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Almarai Edu Compass</title>
${cssTags}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="${assetHref(config, entryFile)}"></script>
  </body>
</html>
`;

      writeFileSync(join(outDir, "index.html"), html, "utf8");
    },
  };
}

export default defineConfig({
  tanstackStart: {
    prerender: { enabled: false },
  },
  vite: {
    // Relative base: avoids wrong absolute `/…` roots when serving from nested paths; aligns script/CSS hrefs with dist/client layout.
    base: "./",

    /** Root outDir fallback when an environment omits `build.outDir` (TanStack derives client/server paths from this). */
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },

    /** Static files (including 3D models) copy into the active client bundle output only. */
    publicDir: "public",

    environments: {
      [CLIENT_ENV]: {
        build: {
          outDir: "dist/client",
          emptyOutDir: true,
          // Explicit: ship `public/` to client output root (alongside index.html).
          copyPublicDir: true,
        },
      },
      [SERVER_ENV]: {
        build: {
          outDir: "dist/server",
          emptyOutDir: true,
          copyPublicDir: false,
        },
      },
    },

    plugins: [emitClientRootIndexHtml()],
    server: {
      host: true,
      port: 3000,
      strictPort: true,
    },
    preview: {
      host: true,
      port: 4173,
      strictPort: true,
    },
  },
});
