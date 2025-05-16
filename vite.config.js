import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      host: "tmdt2.cholimexfood.com.vn",
      protocol: "ws",
    },
    allowedHosts: ["tmdt2.cholimexfood.com.vn"],
  },
});
