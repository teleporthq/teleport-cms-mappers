import { resolve } from 'node:path'
import eslint from "vite-plugin-eslint";
import dts from 'vite-plugin-dts'
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      'node:process': "process",
      'node:path': "path"
    }
  },
  build: {
    rollupOptions: {
       external: ["next", "next/cache", "node:path", "node:process"],
    },
    emptyOutDir: true,
    outDir: "dist",
    target: "esnext",
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        contentful: resolve(__dirname, "src/contentful/index.ts"),
        strapi: resolve(__dirname, "src/strapi/index.ts"),
        wordpress: resolve(__dirname, "src/wordpress/index.ts"),
        'contentful-revalidator': resolve(__dirname, "src/contentful/revalidate.ts")
      },
      formats: ["es", "cjs"],
    }
  },
  plugins: [eslint(), dts({ tsConfigFilePath: "./tsconfig.json" })],
});
