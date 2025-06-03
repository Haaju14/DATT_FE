import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss()],
  };

  if (command === "serve") {
    config.server = {
      host: "0.0.0.0",
      port: 5173,
      hmr: {
        host: "tmdt2.cholimexfood.com.vn",
        port: 5173,
        protocol: "ws",
        clientPort: 80,
      },
      allowedHosts: ["tmdt2.cholimexfood.com.vn"],
    };
  }

  return config;
});
