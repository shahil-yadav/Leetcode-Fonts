import { sendMessage } from "webext-bridge/content-script"
import WebFont from "webfontloader"

export default defineContentScript({
  matches: ["*://leetcode.com/problems/*", "*://leetcode.cn/problems/*"],

  async main() {
    WebFont.load({ google: { families: fonts } })
    sendMessage("injectFontIfAny", { url: document.location.href }, "background")
  }
})
