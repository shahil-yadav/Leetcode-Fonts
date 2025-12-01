import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Leetcode Fonts",
    permissions: ["tabs", "storage", "scripting"],
    host_permissions: [
      "*://leetcode.com/problems/*",
      "*://leetcode.cn/problems/*",
    ],
  },

  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  webExt: {
    startUrls: [
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/description/",
      // "https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/",
    ],
  },
});
