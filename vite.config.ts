import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5000,
    proxy: {
      "/user": "http://localhost:3000/",
      "/workout": "http://localhost:3000/",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
