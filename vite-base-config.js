import eslint from "vite-plugin-eslint";
import dts from 'vite-plugin-dts'

export default {
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: "index"
    },
  },
  plugins: [eslint(), dts({ tsConfigFilePath: "./tsconfig.json"})],
};
