export default defineUnlistedScript(async () => {
  await waitForElement(".monaco-editor");
  // @ts-ignore
  window?.monaco.editor.getEditors()[0].updateOptions({ fontLigatures: true });
});

// waitForElement.js
/**
 * Installs a mutation observer over the DOM tree
 * @param {string} selector
 */
function waitForElement(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
