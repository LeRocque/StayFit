import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/user": "http://localhost:3000/",
      "/workout": "http://localhost:3000/",
    },
  },
});
