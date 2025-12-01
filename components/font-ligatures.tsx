import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useStorage } from "@/hooks/use-storage";

export function FontLigaturesSwitch() {
  const val = useStorage<boolean>(localIsFontLigaturesEnabledStorage.key);

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

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={val ?? false}
        onCheckedChange={handleChange}
        id="ligatures"
      />
      <Label htmlFor="ligatures">Font Ligatures</Label>
    </div>
  );
}
