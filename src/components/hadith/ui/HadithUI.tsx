import clsx from "clsx"
import parse from "html-react-parser"
import sanitizeHtml from "sanitize-html"

export interface IHadith {
  className?: string
  hadith: Hadith
}

export class Hadith {
  constructor(
    public topic: string,
    public lang: string,
    public text: string,
    public reference: Reference[],
  ) {}
}

export class Reference {
  constructor(
    public bookName: string,
    public hadithNum: number,
  ) {}
}

const HadithUI = ({ className, hadith }: IHadith) => {
  const parsedHTML = parse(
    sanitizeHtml(hadith.text, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["nas", "ramz"]),
    }),
  )
  return (
    <div className={clsx("", className)} lang={hadith.lang}>
      {parsedHTML}
    </div>
  )
}

export default HadithUI
