/** @deprecated */
export function useGetCodeFromEditor() {
  const [value, setValue] = useState(() => getDefaultCodeFromEditor());

  useEffect(() => {
    async function main() {
      const tabs = await getLeetcodeTabs();
      for (const tab of tabs) {
        function func() {
          // @ts-ignore
          return window?.monaco?.editor?.getEditors()[0]?.getValue();
        }

        const value = await browser.scripting.executeScript({
          world: "MAIN",
          func,
          target: { tabId: tab.id! },
        });

        if (typeof value[0].result == "string") {
          setValue(value[0].result);
        }
      }
    }
    main();
  }, []);

  return value;
}

interface ITabCode {
  url: string;
  code: string;
}

// TODO: Improve this hook
export function useGetUserCodeFromLeetcodeTabs() {
  const [value, setValue] = useState<ITabCode[]>([
    {
      url: "default",
      code: getDefaultCodeFromEditor(),
    },
  ]);

  useEffect(() => {
    async function main() {
      const tabs = await getLeetcodeTabs();

      const data: ITabCode[] = [];
      for (const tab of tabs) {
        function inject() {
          // @ts-ignore
          return window?.monaco?.editor?.getEditors()[0]?.getValue();
        }

        const value = await browser.scripting.executeScript({
          world: "MAIN",
          func: inject,
          target: { tabId: tab.id! },
        });

        const code: string = value[0].result;

        if (tab.url && code)
          data.push({
            url: tab.url,
            code,
          });
      }

      // setValue(data);
    }

    main();
  }, []);

  return value;
}
