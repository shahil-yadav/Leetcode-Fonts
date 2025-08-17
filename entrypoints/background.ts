import { onMessage } from "webext-bridge/background"

export default defineBackground({
  type: "module",
  async main() {
    onMessage("injectFontIfAny", async ({ data }) => {
      const url = data.url
      const font = await localInjectedFontStorage.getValue()

      if (font !== null) {
        const tabs = await browser.tabs.query({ url })

        async function func(fontFamily: string) {
          // waitForElement.js
          /**
           * Installs a mutation observer over the DOM tree
           * @param {string} selector
           */
          function waitForElement(selector: string) {
            return new Promise((resolve) => {
              if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector))
              }

              const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                  resolve(document.querySelector(selector))
                  observer.disconnect()
                }
              })

              observer.observe(document.body, {
                childList: true,
                subtree: true
              })
            })
          }

          console.log("Waiting for #editor to appear in DOM")
          await waitForElement(".monaco-editor")
          const isEditorPresent = !!document.querySelector(".monaco-editor")
          console.log(
            `document.querySelector(".monaco-editor"):${isEditorPresent}`,
            document.querySelector(".monaco-editor")
          )
          console.log("Trying to inject:", fontFamily)

          if (!Object.keys(window).find((val) => val === "monaco")) {
            throw new Error("Not able to find editor after 2.5sec")
          }

          // @ts-ignore
          window?.monaco?.editor?.getEditors()[0]?.updateOptions({ fontFamily })
        }

        await browser.scripting.executeScript({
          world: "MAIN",
          func,
          args: [font],
          target: { tabId: tabs[0].id! }
        })
      }
    })
  }
})
