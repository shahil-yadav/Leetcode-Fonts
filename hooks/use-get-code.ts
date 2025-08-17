export function useGetCodeFromEditor() {
  const [value, setValue] = useState(() => getCodeFromEditor())

  useEffect(() => {
    async function main() {
      const tabs = await getLeetcodeTabs()
      for (const tab of tabs) {
        function func() {
          // @ts-ignore
          return window?.monaco?.editor?.getEditors()[0]?.getValue()
        }

        const value = await browser.scripting.executeScript({
          world: "MAIN",
          func,
          target: { tabId: tab.id! }
        })

        if (typeof value[0].result == "string") {
          setValue(value[0].result)
        }
      }
    }
    main()
  }, [])

  return value
}
