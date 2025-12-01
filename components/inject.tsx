import type { SubmitHandler } from 'react-hook-form'

import { Controller, useForm } from 'react-hook-form'
import { NavLink } from 'react-router'
import { toast } from 'sonner'
import { sendMessage } from 'webext-bridge/popup'
import WebFont from 'webfontloader'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { renderFonts } from '@/utils/fonts'

import { Label } from './ui/label'
import { Switch } from './ui/switch'

interface IFormInput {
  fontFamily: null | string
  fontLigatures: boolean
}

export function FontsLoader() {
  useEffect(() => WebFont.load({ google: { families: fonts } }), [])
  return <></>
}

export function Inject() {
  const fontFamilyStrg = useStorage<string>(localInjectedFontStorage.key)
  const fontLigaturesStrg = useStorage<boolean>(
    localIsFontLigaturesEnabledStorage.key,
  )

  const { control, handleSubmit } = useForm<IFormInput>({
    values: {
      fontFamily: fontFamilyStrg,

      // fontLigaturesStrg can't be null since the `{ fallback: false }` is provided while initialisation
      // use null coalescing trick
      fontLigatures: fontLigaturesStrg ?? false,
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // set the values from the form to the extension's local strg
    localIsFontLigaturesEnabledStorage.setValue(data.fontLigatures)
    localInjectedFontStorage.setValue(data.fontFamily)

    // inject the code
    // send the message to background, maybe this service-worker act as a event manager
    // hehe! This works
    sendMessage('injectFontIfAny', { }, 'background')

    // give feedback to user
    toast.success(`applied changes to the editor`)
  }

  return (
    <div className="space-y-2 h-85">
      <div className="flex justify-end mb-2">
        <NavLink className="hover:underline" to="/about">
          <code>/about</code>
        </NavLink>
      </div>

      {/* this is controlled by "react-hook-form" library */}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="fontFamily"
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Label id="font-family">Please select any font</Label>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                // value = {null} overrides the placeholder text `Select a font family`
                value={field.value ?? undefined}
              >
                <SelectTrigger className="w-54">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>{renderFonts()}</SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          control={control}
          name="fontLigatures"
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <Label htmlFor="font-ligatures">Font Ligatures</Label>
              <Switch
                checked={field.value}
                id="font-ligatures"
                name={field.name}
                onCheckedChange={field.onChange}
              />
            </div>
          )}
        />

        <Button type="submit">Submit</Button>
        <Reset />
      </form>

    </div>
  )
}
