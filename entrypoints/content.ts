import { sendMessage } from "webext-bridge/content-script";
import WebFont from "webfontloader";

export default defineContentScript({
  matches: ["*://leetcode.com/problems/*", "*://leetcode.cn/problems/*"],
  async main() {
    // load the fonts
    WebFont.load({ google: { families: fonts } });

    // send the message to background  script
    sendMessage("injectFontIfAny", {}, "background");
  },
});
