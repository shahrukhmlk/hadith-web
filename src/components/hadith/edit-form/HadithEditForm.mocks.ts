import { IHadithEditForm } from "./HadithEditForm"

const base: IHadithEditForm = {
  className: undefined,
  languages: [{ code: "ar", name: "Arabic", rtl: true }],
}

export const mockHadithEditFormProps = {
  base,
}
