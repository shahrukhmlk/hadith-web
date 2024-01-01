import { ILanguageMenu } from "./LanguageMenu"

const base: ILanguageMenu = {
  className: undefined,
  languages: [{ code: "ar", name: "Arabic", rtl: true }],
}

export const mockLanguageMenuProps = {
  base,
}
