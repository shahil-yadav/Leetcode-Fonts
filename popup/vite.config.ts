import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

const outDir = path.resolve(__dirname, "../dist")

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["module:@preact/signals-react-transform"]],
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: outDir,
        },
      ],
    }),
  ],

  build: {
    outDir,
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
