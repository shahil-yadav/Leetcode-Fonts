import "webext-bridge"

declare module "webext-bridge" {
  export interface ProtocolMap {
    injectFontIfAny: { url: string }
  }
}
