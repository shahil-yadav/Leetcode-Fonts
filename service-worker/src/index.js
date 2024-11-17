chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  const font = message.font
  if (!font) return

  await chrome.storage.local.set({ font })
    .then(() => console.log(`IN SERVICE WORKER: SUCCESSFULLY SET THE ${font} IN THE STORAGE API`))
})


