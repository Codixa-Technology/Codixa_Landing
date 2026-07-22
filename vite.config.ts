import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Keep the animation runtime in its own long-lived chunk so shipping a
        // copy change doesn't invalidate it.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("motion")) return "motion";
          if (id.includes("react")) return "react";
          return undefined;
        },
      },
    },
  },
});
