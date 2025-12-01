import { ChevronLeft } from 'lucide-react'
import { NavLink } from 'react-router'

import { Link } from './link'
import { Button } from './ui/button'

export function About() {
  return (
    <div className="space-y-2">
      <Button className="size-7" size="icon">
        <NavLink to="/">
          <ChevronLeft />
        </NavLink>
      </Button>

      <p>
        This extension previously had a cursor issue with leetcode&apos; editor,
        which I&apos;ve attempted to fix in this version. However, if you notice
        that the fonts are not changing properly or encounter any other bugs,
        please leave a review on
        <Link
          label="Chrome Web Store"
          url="https://chromewebstore.google.com/detail/leetcode-fonts/hinfimgacobnellbncbcpdlpaapcofaa"
        />
        .
      </p>
      <p>
        I was inspired by the fonts presented in this list
        <Link
          label="https://hail2u.github.io/mn"
          url="https://hail2u.github.io/mn"
        />
        {' '}
        to set them as default ones
      </p>

      <p>
        <code>{'<TODO/> : '}</code>
        If I get some free time, I was thinking of adding support for the
        {' '}
        <Link
          className="ml-0"
          label="Google Fonts API"
          url="https://fonts.google.com"
        />
        {' '}
        to dynamically load any font from their site. That way, you
        wouldn&apos;t be limited to just the default options. But to be honest,
        it feels like a bit of overengineering — the default fonts already get
        the job done well enough.
      </p>
    </div>
  )
}
