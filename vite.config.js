import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
});

/*
export default defineConfig({
  plugins: [react()],
  app: {
    buildAssetsDir: "assets",
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/chunk/[hash].js",
        entryFileNames: "assets/entry/[hash].js",
        assetFileNames: "assets/[ext]/[hash].[ext]",
      },
    },
  },
});
*/
