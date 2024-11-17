import { cn } from "@/lib/utils"
import { useSignal } from "@preact/signals-react"
import { Check, Syringe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Inject({ font }: { font: string }) {
  const isInjected = useSignal(false)
  return (
    <Button
      className={cn(isInjected.value && "bg-green-400")}
      disabled={isInjected.value}
      onClick={handleInject}
      id="inject"
    >
      {isInjected.value ? (
        <>
          <Check /> Preview the changes in the Editor
        </>
      ) : (
        <>
          <Syringe /> Inject the font in the editor
        </>
      )}
    </Button>
  )

  async function handleInject() {
    const tabs = await chrome.tabs.query({
      url: ["https://leetcode.com/problems/*"]
    })

    await chrome.storage.local.set({ font })
      .then(() => console.log(`SUCCESSFULLY SET THE ${font} IN THE STORAGE API`))

    // await chrome.runtime.sendMessage({font}).then(() => console.log(`SENDING A ${font} TO SERVICE WORKER`))
    for (const tab of tabs) {
      if (tab.id) {
        await chrome.tabs.sendMessage(tab.id, {
          font
        })
      }
    }
    isInjected.value = true
  }
}
