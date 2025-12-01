import { Check, ChevronsUpDown } from 'lucide-react'
import WebFont from 'webfontloader'

import AppleLogo from '@/assets/apple.png'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

// TODO: Delete this after done with cleaning
/** @deprecated using <Select /> instead of <Popover /> to comply with form */
export function FontSelector({
  setIsSuccess,
  setValue,
  value,
}: {
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
  setValue: React.Dispatch<React.SetStateAction<string>>
  value: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    WebFont.load({ google: { families: fonts } })
  }, [])

  useEffect(() => {
    if (open) {
      setIsSuccess(false)
    }
  }, [open])

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-[250px] justify-between"
          role="combobox"
          variant="outline"
        >
          {value ?? 'Select any font...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput className="h-9" placeholder="Search font..." />
          <CommandList>
            <CommandEmpty className="p-2">
              <p>Please choose from the default ones as now.</p>
            </CommandEmpty>
            <CommandGroup heading="Experimental">
              {experiments.map(font => (
                <CommandItem
                  key={font}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                  style={{ fontFamily: font }}
                  value={font}
                >
                  <div className="flex items-center w-full justify-between">
                    <span>{font}</span>
                    <img className="size-3" src={AppleLogo} />
                  </div>
                  <Check
                    className={cn(
                      'ml-auto',
                      value === font ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Universal">
              {fonts.map(font => (
                <CommandItem
                  key={font}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                  style={{ fontFamily: font }}
                  value={font}
                >
                  {font}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === font ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
