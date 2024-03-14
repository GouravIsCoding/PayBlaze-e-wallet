import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/user": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/account": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/transaction": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
