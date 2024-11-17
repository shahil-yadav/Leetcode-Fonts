import WebFont from "webfontloader"

const injectWebFont = async (font) => {
  const target = document.querySelector(
    "#editor div.view-lines.monaco-mouse-cursor-text"
  )

  if (target) {
    try {
      WebFont.load({
        google: { families: [font] },
        active() {
          target.style.fontFamily = font
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export { injectWebFont }
