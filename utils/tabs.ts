export async function getLeetcodeTabs() {
  const us = await browser.tabs.query({
    url: "https://leetcode.com/problems/*"
  })
  const cn = await browser.tabs.query({
    url: "https://leetcode.cn/problems/*"
  })

  return await Promise.all([...us, ...cn])
}
