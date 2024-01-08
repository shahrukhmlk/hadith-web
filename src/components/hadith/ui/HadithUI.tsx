import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IHadith } from "@/data/models/hadith"
import { getFont } from "@/lib/fonts"
import clsx from "clsx"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"
import styles from "./hadithui.module.scss"

export interface HadithUIProps extends IHadith {
  className?: string
}

const HadithUI = (props: HadithUIProps) => {
  const html = props.text.replaceAll(
    /("|«|&laquo;).+?("|»|&raquo;)/g,
    "<hadith-nas>$&</hadith-nas>",
  )
  const parsedHTML = parse(
    sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "hadith-nas",
        "ramz",
      ]),
    }),
  )
  return (
    <Card
      className={clsx(
        styles.hadith,
        getFont(props.lang)?.variable,
        props.className,
        "flex flex-col",
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
            {new Intl.DateTimeFormat(props.lang, {
              dateStyle: "full",
            }).format(props.date)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent
        className={clsx("flex flex-1 flex-col justify-center text-center")}
      >
        {parsedHTML}
      </CardContent>
      <CardFooter className="justify-end">
        <p>
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
