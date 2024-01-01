import { getFont } from "@/lib/fonts"
import clsx from "clsx"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"
import styles from "./hadithui.module.scss"

export interface IHadith {
  className?: string
  num: number
  topic: string
  date: Date
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
    <div
      className={clsx(
        styles.hadith,
        getFont(props.lang)?.variable,
        props.className,
      )}
      lang={props.lang}
    >
      <div className="flex items-baseline gap-4">
        <p className="w-40 text-start">
          {props.num.toLocaleString(props.lang)}
        </p>
        <h1 className="flex flex-1 justify-center">{props.topic}</h1>
        <p className="w-40 text-end">
          {new Intl.DateTimeFormat(props.lang).format(props.date)}
        </p>
      </div>
      <div>{parsedHTML}</div>
      {props.books.map((book, index) => {
        return (
          <span key={index}>
            {book.name}: {book.hadithNum.toLocaleString(props.lang)}
          </span>
        )
      })}
    </div>
  )
}

export default HadithUI
