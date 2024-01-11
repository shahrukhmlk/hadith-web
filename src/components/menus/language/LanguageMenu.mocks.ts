import { LanguageMenuProps } from "./LanguageMenu"

const base: LanguageMenuProps = {
  className: undefined,
  languages: [
    { code: "ar", name: "Arabic", rtl: true },
    { code: "ur", name: "Urdu", rtl: true },
    { code: "en", name: "English", rtl: false },
  ],
}

export const mockLanguageMenuProps = {
  base,
}
