import clsx from "clsx"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"
import styles from "./hadithui.module.scss"

export interface IHadith {
  className?: string
  num: number
  topic: string
  lang: string
  text: string
  books: IBook[]
}

export interface IBook {
  name: string
  hadithNum: number
}

const HadithUI = (props: IHadith) => {
  const parsedHTML = parse(
    sanitizeHtml(props.text, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["nas", "ramz"]),
    }),
  )
  return (
    <div className={clsx(props.className, styles.hadith)} lang={props.lang}>
      <div>{parsedHTML}</div>
      {props.books.map((book, index) => {
        return (
          <span key={index}>
            {book.name}: {book.hadithNum}
          </span>
        )
      })}
    </div>
  )
}

export default HadithUI
