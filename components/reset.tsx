import { Button } from './ui/button'

export function Reset() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [showText, setShowText] = useState(false)

  async function handleClick() {
    await localInjectedFontStorage.setValue(null)
    setIsDisabled(true)
    setShowText(true)
  }

  useEffect(() => {
    async function main() {
      const isFontPresent = !!(await localInjectedFontStorage.getValue())
      if (isFontPresent)
        setIsDisabled(false)
    }

    localInjectedFontStorage.watch((val) => {
      if (val) {
        setIsDisabled(false)
      }
    })

    main()
  }, [])

  useEffect(() => {
    if (!showText)
      return

    const timer = setInterval(() => {
      setShowText(false)
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  }, [showText])

  return (
    <>
      {!isDisabled && (
        <Button className="ml-2" onClick={handleClick} variant="outline">
          Reset
        </Button>
      )}

      {showText && (
        <p className="text-green-800">
          Please reload your webpage to see the default font
        </p>
      )}
    </>
  )
}
