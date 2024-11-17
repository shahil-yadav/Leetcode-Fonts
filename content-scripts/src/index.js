import { injectWebFont } from "./webfont"
import { waitForElement } from "./waitForElement"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  injectWebFont(request.font).then(() => {
    console.log("INJECTED WEB FONT SUCCESSFULLY");
  })
})

chrome.storage.local.get('font').then(async ({ font }) => {
  if(!font){
    console.log('NO FONT WAS PRESENT WAS IN THE STORAGE API')
  }
  console.log('WAITING FOR #EDITOR DIV TO RENDER')
  await waitForElement("#editor div.view-lines.monaco-mouse-cursor-text")
  console.log('FOUND THE #EDITOR DIV')
  await injectWebFont(font)
  console.log(`INJECTED WEB FONT ${font} SUCCESSFULLY`)
})



