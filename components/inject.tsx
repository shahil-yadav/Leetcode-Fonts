import SyntaxHighlighter from "react-syntax-highlighter";
import { sendMessage } from "webext-bridge/popup";
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { Reset } from "./reset";
import LeetcodeLogo from "@/assets/leetcode.svg";
import { FontLigaturesSwitch } from "./font-ligatures";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { renderFonts } from "@/utils/fonts";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import WebFont from "webfontloader";

interface IFormInput {
  fontFamily: string | null;
  fontLigatures: boolean;
}

export function Inject() {
  const fontFamilyStrg = useStorage<string>(localInjectedFontStorage.key);
  const fontLigaturesStrg = useStorage<boolean>(
    localIsFontLigaturesEnabledStorage.key
  );

  const { control, handleSubmit, formState } = useForm<IFormInput>({
    values: {
      fontFamily: fontFamilyStrg,

      // fontLigaturesStrg can't be null since the `{ fallback: false }` is provided while initialisation
      // use null coalescing trick
      fontLigatures: fontLigaturesStrg ?? false,
    },
  });

  const codeTabs = useGetUserCodeFromLeetcodeTabs();

  // FIXME: See these two states, need to refractor everything connected to font variable
  // const fontStrg = useStorage<string>(localInjectedFontStorage.key);
  // const [font, setFont] = useState(fonts[0]);
  // //
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isError, setIsError] = useState(false);

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // set the values from the form to the extension's local strg
    localIsFontLigaturesEnabledStorage.setValue(data.fontLigatures);
    localInjectedFontStorage.setValue(data.fontFamily);

    // inject the code
    // send the message to background, maybe this service-worker act as a event manager
    // hehe! This works
    sendMessage("injectFontIfAny", { url: undefined }, "background");

    // give feedback to user
    toast.success(`applied changes to the editor`);
  };

  // if (isError) {
  //   return (
  //     <div className="p-5 space-y-4">
  //       <p className="text-right">
  //         <code>{"<Error />"}</code>
  //       </p>
  //       <div className="flex gap-3 items-center">
  //         <img className="size-10" src={LeetcodeLogo} />
  //         <p>
  //           LeetCode may have resolved the memory leak issue that this extension
  //           relied on to function
  //         </p>
  //       </div>

  //       <Button onClick={() => setIsError(false)}>Try again</Button>
  //     </div>
  //   );
  // }

  // useEffect(() => {
  //   WebFont.load({ google: { families: fonts } });
  // }, []);

  return (
    <div className="space-y-2 h-80">
      <div className="flex justify-end mb-2">
        {/* <Link
          label="Leetfonts"
          url="https://chromewebstore.google.com/detail/leetcode-fonts/hinfimgacobnellbncbcpdlpaapcofaa"
          className="text-lg font-semibold text-foreground no-underline hover:underline hover:text-foreground/70"
        /> */}

        <NavLink className="hover:underline" to="/about">
          <code>/about</code>
        </NavLink>
      </div>

      {/* this is controlled by "react-hook-form" library */}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fontFamily"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Label id="font-family">Please select any font</Label>
              <Select
                name={field.name}
                // value = {null} overrides the placeholder text `Select a font family`
                value={field.value ?? undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>{renderFonts()}</SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          name="fontLigatures"
          control={control}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Label htmlFor="font-ligatures">Font Ligatures</Label>
              <Switch
                id="font-ligatures"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>

      {/* <FontSelector
        setIsSuccess={setIsSuccess}
        value={font}
        setValue={setFont}
      /> */}

      {/* <FontLigaturesSwitch /> */}

      {/* <Button disabled={isSuccess} onClick={handleInject} className="ml-2">
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
      </div> */}

      {/* <footer className="ml-1 font-bold">Made by Shahil</footer> */}
    </div>
  );
}
