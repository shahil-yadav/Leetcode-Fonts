import { Inject } from "@/components/inject"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useSignal } from "@preact/signals-react"
import { CircleX, Loader2Icon } from "lucide-react"
import WebFont from "webfontloader"

const fonts = getMonospacedFonts()


export function FontPicker(props: { setFontStyle: (arg: string) => void }) {
  const font = useSignal<string>()
  const isFontLoading = useSignal<boolean>(false)
  const error = useSignal("")

  const handleChange = (arg: string) => {
    font.value = ""

    if (fonts.includes(arg)) {
      font.value = arg
      props.setFontStyle(font.value)
      return
    }

    WebFont.load({
      google: { families: [arg] },
      active: () => {
        font.value = arg
        props.setFontStyle(font.value)
        isFontLoading.value = false
        error.value = ""
      },
      loading: () => {
        isFontLoading.value = true
      },
      inactive: () => {
        isFontLoading.value = false
        error.value =
          "Check your internet connection or please check whether this font is included in Google Fonts"
      }
    })
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg">Take the control of your font styles back</h2>
      <Select value={font.value} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Please select a font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem style={{ fontFamily: font }} key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        {isFontLoading.value && <Loader2Icon className="animate-spin" />}
        {font.value && (
          <p className="text-green-400 text-sm">{font} is ready to inject</p>
        )}
        {error.value && (
          <div className="flex items-center text-red-400 gap-2">
            <CircleX />
            <span className="">{error.value}</span>
          </div>
        )}
      </div>
      {font.value && <Inject font={font.value} />}
    </div>
  )
}

function getMonospacedFonts() {
  const fonts = [
    "Fira Code",            // Very popular in coding communities for its ligatures
    "JetBrains Mono",       // Popular among developers, especially in IDEs like JetBrains
    "Source Code Pro",      // Widely used in development, particularly by Adobe
    "Roboto Mono",          // Popular on the web, part of the Google Fonts collection
    "Inconsolata",          // A favorite for many coders, particularly in open-source projects
    "IBM Plex Mono",        // Gaining popularity, especially for web design and development
    "Fira Mono",            // Another well-loved font in the development space, from Mozilla
    "Droid Sans Mono",      // Popular for Android development and embedded systems
    "Ubuntu Mono",          // Used in Ubuntu's terminal and for various Linux setups
    "PT Mono",              // Gaining popularity in web projects
    "Space Mono",           // A more recent choice, part of Google Fonts
    "Overpass Mono",        // Developed by Red Hat, a clean, professional option
    "Anonymous Pro",        // Popular in tech and coding, especially in open-source projects
    "Cousine",              // A bit more niche, but still used in coding environments
    "Cutive Mono",          // A unique, vintage style mono font
    "Share Tech Mono",      // Used in various tech-centric designs
    "Nanum Gothic Coding",  // Popular in Korean web and app development
    "Azeret Mono",          // A newer font, gaining traction
    "Courier Prime"        // Traditional choice, though slightly less popular in modern design
  ]

  WebFont.load({
    google: {
      families: fonts
    }
  })

  return fonts
}
