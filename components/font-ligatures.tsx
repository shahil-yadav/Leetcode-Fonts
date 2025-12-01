import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useStorage } from '@/hooks/use-storage'

export function FontLigaturesSwitch() {
  const val = useStorage<boolean>(localIsFontLigaturesEnabledStorage.key)

  async function handleChange(checked: boolean) {
    const tabs = await getLeetcodeTabs()

    for (const tab of tabs) {
      await browser.scripting.executeScript({
        args: [checked],
        func: injectScriptToEnableFontLigatures,
        target: { tabId: tab.id! },
        world: 'MAIN',
      })
    }

    localIsFontLigaturesEnabledStorage.setValue(checked)
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={val ?? false}
        id="ligatures"
        onCheckedChange={handleChange}
      />
      <Label htmlFor="ligatures">Font Ligatures</Label>
    </div>
  )
}
