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
       external: ["node:path", "node:process"],
    },
    emptyOutDir: true,
    outDir: "dist",
    target: "esnext",
    lib: {
      entry: {
        contentful: resolve(__dirname, "src/contentful/index.ts"),
        strapi: resolve(__dirname, "src/strapi/index.ts"),
        wordpress: resolve(__dirname, "src/wordpress/index.ts"),
        'contentful-revalidator': resolve(__dirname, "src/contentful/revalidate.ts"),
        'strapi-revalidator': resolve(__dirname, "src/strapi/revalidate.ts"),
        'wordpress-revalidator': resolve(__dirname, "src/wordpress/revalidate.ts")
      },
      formats: ["es", "cjs"],
    }
  },
  plugins: [eslint(), dts({ tsConfigFilePath: "./tsconfig.json" })],
});
