import { sendMessage } from "webext-bridge/content-script";
import WebFont from "webfontloader";

export default defineContentScript({
  matches: ["*://leetcode.com/problems/*", "*://leetcode.cn/problems/*"],
  async main() {
    console.log("Loading", fonts);
    WebFont.load({ google: { families: fonts } });

    console.log(
      `sendMessage("injectFontIfAny", { url: document.location.href }, "background")`,
    );
    sendMessage(
      "injectFontIfAny",
      { url: document.location.href },
      "background",
    );
  },
});
