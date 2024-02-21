export type UIHadith = {
  id: number
  number: number
  date: Date
  topic: string
  text: string
  books: UIHadithBook[]
  translations: UIHadithTranslation[]
}
export type UIHadithTranslation = {
  languageCode: string
  text: string
}
export type UIHadithBook = {
  id: number
  name: string
  hadithRefNumber: number
}
