interface ITabCode {
  code: string
  url: string
}

/** @deprecated */
export function useGetCodeFromEditor() {
  const [value, setValue] = useState(() => getDefaultCodeFromEditor())

  useEffect(() => {
    async function main() {
      const tabs = await getLeetcodeTabs()
      for (const tab of tabs) {
        function func() {
          // @ts-ignore
          return window?.monaco?.editor?.getEditors()[0]?.getValue()
        }

        const value = await browser.scripting.executeScript({
          func,
          target: { tabId: tab.id! },
          world: 'MAIN',
        })

        if (typeof value[0].result == 'string') {
          setValue(value[0].result)
        }
      }
    }
    main()
  }, [])

  return value
}

// TODO: Improve this hook
export function useGetUserCodeFromLeetcodeTabs() {
  const [value, setValue] = useState<ITabCode[]>([
    {
      code: getDefaultCodeFromEditor(),
      url: 'default',
    },
  ])

  useEffect(() => {
    async function main() {
      const tabs = await getLeetcodeTabs()

      const data: ITabCode[] = []
      for (const tab of tabs) {
        function inject() {
          // @ts-ignore
          return window?.monaco?.editor?.getEditors()[0]?.getValue()
        }

        const value = await browser.scripting.executeScript({
          func: inject,
          target: { tabId: tab.id! },
          world: 'MAIN',
        })

        const code: string = value[0].result

        if (tab.url && code) {
          data.push({
            code,
            url: tab.url,
          })
        }
      }

      // setValue(data);
    }

    main()
  }, [])

  return value
}
