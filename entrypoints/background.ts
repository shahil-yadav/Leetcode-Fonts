import { onMessage } from "webext-bridge/background";

export default defineBackground({
  type: "module",
  async main() {
    onMessage("injectFontIfAny", async () => {
      const font = await localInjectedFontStorage.getValue();
      const fontLigatures = await localIsFontLigaturesEnabledStorage.getValue();

      if (font !== null) {
        const tabs = await getLeetcodeTabs();

        for (const tab of tabs) {
          await browser.scripting.executeScript({
            world: "MAIN",
            func: injectScript,
            args: [font, fontLigatures],
            target: { tabId: tab.id! },
          });
        }
      }
    });
  },
});
