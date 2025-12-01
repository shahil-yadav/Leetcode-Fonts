// @ts-nocheck

/**
 *  __Cautious__ : include waitForElement.js code nested inside
 * this function shouldn't contain any dependency
 */
export async function injectScript(fontFamily: string, fontLigatures: boolean) {
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
        subtree: true,
      })
    })
  }

  await waitForElement('.monaco-editor')

  if (!Object.keys(window).find(val => val === 'monaco')) {
    throw new Error('Not able to find editor after 2.5sec')
  }

  window?.monaco?.editor
    ?.getEditors()[0]
    ?.updateOptions({ fontFamily, fontLigatures })
}
