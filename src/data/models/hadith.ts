export interface IHadith {
  num: number
  date: Date
  topic: string
  lang: string
  text: string
  books: IBook[]
}

export interface IBook {
  id: number
  name: string
  hadithNum: number
}
