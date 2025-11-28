// @ts-nocheck

// These are all custom scripts that needs to be injected into main context of leetcode window
export function injectScriptToEnableFontLigatures(val: boolean) {
  window?.monaco.editor.getEditors()[0].updateOptions({ fontLigatures: val });
  console.log("font ligatures", val ? "enabled" : "not enabled");
}
