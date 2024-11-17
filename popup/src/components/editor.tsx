import { FontPicker } from "@/components/font-editor"
import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { Button } from "@/components/ui/button"
import { useSignal } from "@preact/signals-react"
import { cn } from "@/lib/utils.ts"

export function Editor() {
  const [fontStyle, setFontStyle] = React.useState<string>()

  return (
    <div className="mt-5 space-y-5">
      <FontPicker setFontStyle={setFontStyle} />
      <Text font={fontStyle} />
    </div>
  )
}

const code = `class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int j = 2; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p.charAt(j - 1) == '*') {
                    dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.'));
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && (s.charAt(i - 1) == p.charAt(j - 1) || p.charAt(j - 1) == '.');
                }
            }
        }
        return dp[m][n];
    }
}`

function Text(props: { font?: string }) {
  const theme = atomOneDark
  React.useEffect(() => {
    if (!props.font) return
    const editor = document.querySelector<HTMLDivElement>("pre > code")
    if (editor) {
      editor.style.fontFamily = props.font
    }
  }, [props.font])

  if (!props.font) {
    return (
      <div className="space-y-3">
        <p>
          I was inspired by this <button onClick={() => chrome.tabs.create({ url: "https://hail2u.github.io/mn/" })}
                                         className="text-blue-500">blog</button>, for the
          following fonts availaible in this plugin
        </p>
        <p className="text-zinc-300">Made with ❤️ by
          <button className="hover:underline ml-1 font-bold"
                  onClick={() => chrome.tabs.create({ url: "https://www.linkedin.com/in/shahilyadav" })}>Shahil
            Yadav</button>
        </p>
        <Reset />
      </div>
    )
  }

  return (
    <div id="editor">
      <SyntaxHighlighter language="javascript" style={theme}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

function Reset() {
  const isClicked = useSignal(false)

  function handleClick() {
    chrome.storage.local.set({ font: "" })
    isClicked.value = true
  }

  return (
    <Button disabled={isClicked.value} className={cn(isClicked.value && "bg-green-400")} onClick={handleClick}>
      {!isClicked.value ? "Reset to Default" : "Please refresh the page to use default font of Leetcode"}
    </Button>
  )
}