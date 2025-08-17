import { defineConfig } from "wxt"
import tailwindcss from "@tailwindcss/vite"

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["tabs", "storage", "scripting"]
  },
  modules: ["@wxt-dev/module-react"],
  vite: () => ({
    plugins: [tailwindcss()]
  }),
  webExt: {
    startUrls: [
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/"
    ]
  }
})
