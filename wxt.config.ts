import tailwindcss from "@tailwindcss/vite"
import { googleAnalytics4 } from "@wxt-dev/analytics/providers/google-analytics-4"
import { defineConfig } from "wxt"

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Leetcode Fonts",
    permissions: ["tabs", "storage", "scripting"],
    host_permissions: ["*://leetcode.com/problems/*", "*://leetcode.cn/problems/*"]
  },

  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons", "@wxt-dev/analytics/module"],
  vite: () => ({
    plugins: [tailwindcss()]
  }),
  webExt: {
    startUrls: [
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/"
    ]
  }
})
