import SyntaxHighlighter from "react-syntax-highlighter"
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { Button } from "@/components/ui/button"

export function Inject() {
  const code = useGetCodeFromEditor()
  const [font, setFont] = useState(fonts[0])
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!isSuccess) return

    const timer = setInterval(() => {
      setIsSuccess(false)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [isSuccess])

  async function handleInject() {
    const tabs = await getLeetcodeTabs()
    for (const tab of tabs) {
      function func(fontFamily: string) {
        // @ts-ignore
        window?.monaco?.editor?.getEditors()[0]?.updateOptions({ fontFamily })
      }

      await browser.scripting.executeScript({
        world: "MAIN",
        func,
        args: [font],
        target: { tabId: tab.id! }
      })
    }

    await localInjectedFontStorage.setValue(font)
    setIsSuccess(true)
  }

  return (
    <div>
      {/* TODO Make an < About.tsx />  */}
      <p className="mb-3">
        I was inspired by this{" "}
        <button
          onClick={() => browser.tabs.create({ url: "https://hail2u.github.io/mn/" })}
          className="text-blue-500"
        >
          blog
        </button>
        , for the following fonts availaible in this plugin
      </p>
      {/* <p>
        You can use any other fonts availaible from the Google Fonts website too if you want more
        customisability
      </p> */}
      <FontSelector value={font} setValue={setFont} />
      <Button disabled={isSuccess} onClick={handleInject} className="ml-2">
        {isSuccess ? "Injected" : "Inject"}
      </Button>
      <Reset />
      {isSuccess && (
        <p className="my-1 text-green-800">Changes are applied to your editor successfully</p>
      )}
      <div className="my-4">
        <SyntaxHighlighter
          customStyle={{ height: 444 }}
          codeTagProps={{ style: { fontFamily: font } }}
          style={androidstudio}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <footer>
        Made with ❤️ by
        <button
          className="hover:underline ml-1 font-bold"
          onClick={() => browser.tabs.create({ url: "https://www.linkedin.com/in/shahilyadav" })}
        >
          Shahil Yadav
        </button>
      </footer>
    </div>
  )
}

function Reset() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [showText, setShowText] = useState(false)

  async function handleClick() {
    await localInjectedFontStorage.setValue(null)
    setIsDisabled(true)
    setShowText(true)
  }

  useEffect(() => {
    async function main() {
      const isFontPresent = !!(await localInjectedFontStorage.getValue())
      if (isFontPresent) setIsDisabled(false)
    }

    localInjectedFontStorage.watch((val) => {
      if (!!val) {
        setIsDisabled(false)
      }
    })

    main()
  }, [])

  return (
    <>
      {showText && (
        <p className="text-green-800">Please reload your webpage to see the default font</p>
      )}
      {!isDisabled && (
        <Button className="ml-2" variant="outline" onClick={handleClick}>
          Reset
        </Button>
      )}
    </>
  )
}
