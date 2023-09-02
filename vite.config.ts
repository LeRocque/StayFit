import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 4000,
    proxy: {
      "/user": "http://localhost:3000/",
      "/workout": "http://localhost:3000/",
    },
    host: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
