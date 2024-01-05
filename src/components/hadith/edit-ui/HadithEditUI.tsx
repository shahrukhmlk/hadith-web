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

export interface IHadithEditUI {
  className?: string
  lang?: string
  text?: string
  topic?: string
}

const HadithEditUI = (props: IHadithEditUI) => {
  const html = props.text?.replaceAll(
    /("|«|&laquo;).+?("|»|&raquo;)/g,
    "<hadith-nas>$&</hadith-nas>",
  )
  const parsedHTML = parse(
    sanitizeHtml(html || "", {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "hadith-nas",
        "ramz",
      ]),
    }),
  )
  return (
    <Card
      className={clsx(
        getFont(props.lang || "")?.variable,
        props.className,
        "flex flex-col",
      )}
      lang={props.lang}
    >
      <CardHeader>
        <CardTitle className="text-center">Topic: {props.topic}</CardTitle>
      </CardHeader>
      <CardContent
        className={clsx("flex flex-1 flex-col justify-center text-center")}
      >
        {parsedHTML}
      </CardContent>
    </Card>
  )
}

export default HadithEditUI
