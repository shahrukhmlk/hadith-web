import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <Card
      className={clsx(
        styles.hadith,
        getFont(props.lang)?.variable,
        props.className,
      )}
      lang={props.lang}
    >
      <CardHeader>
        <CardTitle className="text-center">{props.topic}</CardTitle>
        <CardDescription className="flex">
          <span>
            {props.num.toLocaleString(props.lang, { useGrouping: false })}
          </span>
          <span className="flex-1"></span>
          <span>
            {new Intl.DateTimeFormat(props.lang, { dateStyle: "full" }).format(
              props.date,
            )}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className={clsx("text-center")}>{parsedHTML}</CardContent>
      <CardFooter className="justify-end">
        <p>
          {" "}
          {props.books.map((book, index) => {
            return (
              <span key={index}>
                {book.name}:{" "}
                {book.hadithNum.toLocaleString(props.lang, {
                  useGrouping: false,
                })}
              </span>
            )
          })}
        </p>
      </CardFooter>
    </Card>
  )
}

export default HadithUI
