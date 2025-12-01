import { toast } from 'sonner'
import { sendMessage } from 'webext-bridge/popup'

import { Button } from './ui/button'

export function Reset() {
  async function handleClick() {
    // reset the values in the storage
    localInjectedFontStorage.setValue(null)
    localIsFontLigaturesEnabledStorage.setValue(false)

    // send reset event to background
    sendMessage('reset', { }, `background`)
    toast.info('reloading leetcode to undo changes')
  }

  return (
    <Button className="ml-2" onClick={handleClick} type="reset" variant="outline">
      Reset
    </Button>
  )
}
