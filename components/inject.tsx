import SyntaxHighlighter from "react-syntax-highlighter";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { Reset } from "./reset";
import LeetcodeLogo from "@/assets/leetcode.svg";
import { FontLigaturesSwitch } from "./font-ligatures";

export function Inject() {
  const code = useGetCodeFromEditor();
  // FIXME: See these two states, need to refractor everything connected to font variable
  // const fontStrg = useStorage<string>(localInjectedFontStorage.key);
  const [font, setFont] = useState(fonts[0]);
  //
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  /**  I think i am interfering with UX */
  // useEffect(() => {
  //   if (!isSuccess) return

  //   const timer = setInterval(() => {
  //     setIsSuccess(false)
  //   }, 1000)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [isSuccess])

  async function handleInject() {
    const tabs = await getLeetcodeTabs();
    for (const tab of tabs) {
      function func(fontFamily: string) {
        // @ts-ignore
        window?.monaco?.editor?.getEditors()[0]?.updateOptions({ fontFamily });
        return !!window?.monaco;
      }

      const bools = await browser.scripting.executeScript({
        world: "MAIN",
        func,
        args: [font],
        target: { tabId: tab.id! },
      });

      for (const { result } of bools) {
        if (!result) {
          setIsError(true);
          break;
        }
      }
    }

    await localInjectedFontStorage.setValue(font);
    setIsSuccess(true);
  }

  if (isError) {
    return (
      <div className="p-5 space-y-4">
        <p className="text-right">
          <code>{"<Error />"}</code>
        </p>
        <div className="flex gap-3 items-center">
          <img className="size-10" src={LeetcodeLogo} />
          <p>
            LeetCode may have resolved the memory leak issue that this extension
            relied on to function
          </p>
        </div>

        <Button onClick={() => setIsError(false)}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-end mb-2">
        {/* <Link
          label="Leetfonts"
          url="https://chromewebstore.google.com/detail/leetcode-fonts/hinfimgacobnellbncbcpdlpaapcofaa"
          className="text-lg font-semibold text-foreground no-underline hover:underline hover:text-foreground/70"
        /> */}

        <NavLink to="/about">/about</NavLink>
      </div>

      <FontSelector
        setIsSuccess={setIsSuccess}
        value={font}
        setValue={setFont}
      />
      <FontLigaturesSwitch />
      <Button disabled={isSuccess} onClick={handleInject} className="ml-2">
        {isSuccess ? "Injected" : "Inject"}
      </Button>
      <Reset />
      {isSuccess && (
        <div className="text-green-800 mt-1">
          <p className="font-bold">
            Reload the leetcode if you don't see the changes rightaway
          </p>
          <p className="">Changes are applied to your editor successfully</p>
        </div>
      )}
      <div className="my-2">
        <SyntaxHighlighter
          customStyle={{ height: 444 }}
          codeTagProps={{ style: { fontFamily: font } }}
          style={androidstudio}
          language="cpp"
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <footer className="ml-1 font-bold">Made by Shahil</footer>
    </div>
  );
}
