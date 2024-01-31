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
import { forwardRef } from "react"
import sanitizeHtml from "sanitize-html"
import styles from "./hadithui.module.scss"

export interface HadithUIProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number
  date: Date
  topic: string
  text: string
  color: string
  bookText: string
}

const HadithUI = forwardRef<HTMLDivElement, HadithUIProps>(
  ({ number, date, topic, text, color, bookText, ...props }, ref) => {
    const html = text.replaceAll(
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
        ref={ref}
        className={clsx(
          styles.hadith,
          getFont("ar")?.variable,
          props.className,
          "flex flex-col",
        )}
        lang={"ar"}
      >
        <CardHeader>
          <CardTitle className="text-center">{topic}</CardTitle>
          <CardDescription className="flex">
            <span>
              {number.toLocaleString("ar-eg", { useGrouping: false })}
            </span>
            <span className="flex-1"></span>
            <span>
              {new Intl.DateTimeFormat("ar-eg", {
                dateStyle: "full",
              }).format(date)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className={clsx("flex-1 text-center text-xl")}>
          {parsedHTML}
        </CardContent>
        <CardFooter className="justify-end">
          <p>{bookText}</p>
        </CardFooter>
      </Card>
    )
  },
)
HadithUI.displayName = "HadithUI"
export default HadithUI
