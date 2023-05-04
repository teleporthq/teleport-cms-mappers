import { resolve } from 'node:path'
import eslint from "vite-plugin-eslint";
import dts from 'vite-plugin-dts'
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: {
        contentful: resolve(__dirname, "src/contentful/index.ts"),
        strapi: resolve(__dirname, "src/strapi/index.ts")
      },
      formats: ["es", "cjs"],
    },
  },
  plugins: [eslint(), dts({ tsConfigFilePath: "./tsconfig.json" })],
});
