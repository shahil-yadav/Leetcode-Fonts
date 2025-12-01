export const localInjectedFontStorage =
  storage.defineItem<string>("local:injectedFont");

export const localIsFontLigaturesEnabledStorage = storage.defineItem<boolean>(
  "local:isFontLigaturesEnabled",
  { fallback: false }
);
