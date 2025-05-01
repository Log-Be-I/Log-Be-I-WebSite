import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
<<<<<<< HEAD
        target: "http://localhost:8080",
=======
        target: "https://logbe-i.com",
>>>>>>> e40ad4ce3e68c5c2c67c1fc6f66ce552ac7dd4b3
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
