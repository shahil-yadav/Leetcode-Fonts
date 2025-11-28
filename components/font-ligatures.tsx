import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function FontLigaturesSwitch() {
  const [val, setVal] = useState<boolean>(false);

  async function handleChange(checked: boolean) {
    const tabs = await getLeetcodeTabs();

    for (const tab of tabs) {
      await browser.scripting.executeScript({
        world: "MAIN",
        func: injectScriptToEnableFontLigatures,
        args: [checked],
        target: { tabId: tab.id! },
      });
    }

    localIsFontLigaturesEnabledStorage.setValue(checked);
  }

  useEffect(() => {
    const unwatch = localIsFontLigaturesEnabledStorage.watch((newVal) => {
      setVal(newVal);
    });

    async function main() {
      setVal(await localIsFontLigaturesEnabledStorage.getValue());
    }

    main();

    return () => {
      // removing event listeners
      unwatch();
    };
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={val} onCheckedChange={handleChange} id="ligatures" />
      <Label htmlFor="ligatures">Font Ligatures</Label>
    </div>
  );
}
