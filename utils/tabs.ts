export async function getLeetcodeTabs() {
  // united states
  const us = await browser.tabs.query({
    url: 'https://leetcode.com/problems/*',
  })

  // china mainland
  const cn = await browser.tabs.query({
    url: 'https://leetcode.cn/problems/*',
  })

  return await Promise.all([...us, ...cn])
}
