import { onMessage } from 'webext-bridge/background'

export default defineBackground({
  async main() {
    onMessage('injectFontIfAny', async () => {
      const font = await localInjectedFontStorage.getValue()
      const fontLigatures = await localIsFontLigaturesEnabledStorage.getValue()

      if (font !== null) {
        const tabs = await getLeetcodeTabs()

        for (const tab of tabs) {
          await browser.scripting.executeScript({
            args: [font, fontLigatures],
            func: injectMyScript,
            target: { tabId: tab.id! },
            world: 'MAIN',
          })
        }
      }
    })

    onMessage('reset', async () => {
      const tabs = await getLeetcodeTabs()
      for (const tab of tabs) {
        await browser.scripting.executeScript({
          func: () => window.location.reload(),
          target: { tabId: tab.id! },
          world: 'MAIN',
        })
      }
    })
  },
  type: 'module',
})
