import { HadithBookSelectorProps } from "./HadithBookSelector"

const base: HadithBookSelectorProps = {
  className: undefined,
  books: [],
  selectedBook: {
    id: 1,
    sort: null,
    books_translations: [{ languages_code: "en", name: "selectedBook" }],
  },
  onBookSelect(book) {},
}

export const mockHadithBookSelectorProps = {
  base,
}
