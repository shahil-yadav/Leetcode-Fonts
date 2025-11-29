import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WebFont from "webfontloader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AppleLogo from "@/assets/apple.png";

export function FontSelector({
  setValue,
  setIsSuccess,
  value,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    WebFont.load({ google: { families: fonts } });
  }, []);

  useEffect(() => {
    if (open) {
      setIsSuccess(false);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value ?? "Select any font..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search font..." className="h-9" />
          <CommandList>
            <CommandEmpty className="p-2">
              <p>Please choose from the default ones as now.</p>
            </CommandEmpty>
            <CommandGroup heading="Experimental">
              {experiments.map((font) => (
                <CommandItem
                  key={font}
                  value={font}
                  style={{ fontFamily: font }}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center w-full justify-between">
                    <span>{font}</span>
                    <img src={AppleLogo} className="size-3" />
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === font ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Universal">
              {fonts.map((font) => (
                <CommandItem
                  key={font}
                  value={font}
                  style={{ fontFamily: font }}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                  }}
                >
                  {font}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === font ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
