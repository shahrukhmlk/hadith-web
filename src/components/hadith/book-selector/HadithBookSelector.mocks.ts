import { HadithBookSelectorProps } from "./HadithBookSelector"

const base: HadithBookSelectorProps = {
  className: undefined,
  books: [],
  selectedBook: {
    id: 1,
    name: "Book",
    translations: [{ languageCode: "en", name: "selectedBook" }],
  },
  onBookSelect(book) {},
}

export const mockHadithBookSelectorProps = {
  base,
}
