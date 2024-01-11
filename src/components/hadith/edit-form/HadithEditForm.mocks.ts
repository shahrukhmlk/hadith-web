import { IHadithEditForm } from "./HadithEditForm"

const base: IHadithEditForm = {
  className: undefined,
  languages: [{ code: "ar", name: "Arabic", rtl: true }],
  books: [],
  date: new Date(),
  hadith: null,
}

export const mockHadithEditFormProps = {
  base,
}
