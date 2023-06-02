import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import makeManifest from "./utils/plugins/make-manifest";
import copyContentStyle from "./utils/plugins/copy-content-style";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { splitVendorChunkPlugin } from "vite";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

export default ({ mode, command }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        "@src": root,
        "@assets": assetsDir,
        "@pages": pagesDir,
      },
    },
    plugins: [

      makeManifest(),
      copyContentStyle(),
      splitVendorChunkPlugin(),
      //eslint(),
    ],

    publicDir,
    build: {
      outDir,
      rollupOptions: {
        input: {
          devtools: resolve(pagesDir, "devtools", "index.html"),
          panel: resolve(pagesDir, "panel", "index.html"),
          content: resolve(pagesDir, "content", "index.ts"),
          background: resolve(pagesDir, "background", "index.ts"),
          popup: resolve(pagesDir, "popup", "index.html"),
          newtab: resolve(pagesDir, "newtab", "index.html"),
          options: resolve(pagesDir, "options", "index.html"),
        },
        output: {
          entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`,
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          // NodeGlobalsPolyfillPlugin({
          //   buffer: true,
          // })
        ],
      },
    },
  });
};
