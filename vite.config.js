import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "https://logbe-i.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        privacy: path.resolve(__dirname, "public/privacy.html"),
        terms: path.resolve(__dirname, "public/terms.html"),
      },
    },
  },
});
