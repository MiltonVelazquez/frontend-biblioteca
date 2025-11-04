import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite acceso externo
    allowedHosts: [".replit.dev"], // Permite el host de Replit

    // Configuración HMR para que el auto-refresh funcione en HTTPS
    hmr: {
      clientPort: 443,
      protocol: "wss",
    },
  },
  preview: {
    // También es bueno permitir el host aquí
    host: "0.0.0.0",
  },
});
