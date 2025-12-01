import { SelectGroup } from '@radix-ui/react-select'

import AppleLogo from '@/assets/apple.svg'
import LinuxLogo from '@/assets/linux.svg'
import WindowsLogo from '@/assets/windows.svg'
import { SelectItem, SelectLabel } from '@/components/ui/select'

export const fonts = [
  'Fira Code', // Very popular in coding communities for its ligatures
  'JetBrains Mono', // Popular among developers, especially in IDEs like JetBrains
  'Source Code Pro', // Widely used in development, particularly by Adobe
  'Roboto Mono', // Popular on the web, part of the Google Fonts collection
  'Inconsolata', // A favorite for many coders, particularly in open-source projects
  'IBM Plex Mono', // Gaining popularity, especially for web design and development
  'Fira Mono', // Another well-loved font in the development space, from Mozilla
  'Droid Sans Mono', // Popular for Android development and embedded systems
  'Ubuntu Mono', // Used in Ubuntu's terminal and for various Linux setups
  'PT Mono', // Gaining popularity in web projects
  'Space Mono', // A more recent choice, part of Google Fonts
  'Overpass Mono', // Developed by Red Hat, a clean, professional option
  'Anonymous Pro', // Popular in tech and coding, especially in open-source projects
  'Cousine', // A bit more niche, but still used in coding environments
  'Cutive Mono', // A unique, vintage style mono font
  'Share Tech Mono', // Used in various tech-centric designs
  'Nanum Gothic Coding', // Popular in Korean web and app development
  'Azeret Mono', // A newer font, gaining traction
  'Courier Prime', // Traditional choice, though slightly less popular in modern design
]

/** Apple Experimental Fonts */
export const experiments = ['Monaco', 'SF Mono']

// helper fn
export function renderFonts() {
  const renderItem = (font: string) => (
    <SelectItem key={font} style={{ fontFamily: font }} value={font}>
      {font}
    </SelectItem>
  )

  const items = fonts.map(renderItem)
  const experimentalItems = experiments.map(renderItem)

  return (
    <>
      <SelectGroup>
        <SelectLabel className="text-stone-400">
          <div className="flex gap-1 items-center">
            <span>Apple</span>
            <img className="size-3" src={AppleLogo} />
          </div>
        </SelectLabel>
        {experimentalItems}
      </SelectGroup>
      <SelectGroup>
        <SelectLabel>
          <div className="flex items-center gap-3">
            Universal
            <img className="size-3" src={WindowsLogo} />
            <img className="size-3" src={AppleLogo} />
            <img className="size-3" src={LinuxLogo} />
          </div>
        </SelectLabel>
        {items}
      </SelectGroup>
    </>
  )
}
