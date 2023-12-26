import clsx from "clsx"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"

export interface IHadith {
  className?: string
  language: string
  text: string
}

const Hadith = ({ className, language, text }: IHadith) => {
  const parsedHTML = parse(
    sanitizeHtml(text, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["nas", "symbol"]),
    }),
  )
  return (
    <div className={clsx("", className)} lang={language}>
      {parsedHTML}
    </div>
  )
}

export default Hadith
