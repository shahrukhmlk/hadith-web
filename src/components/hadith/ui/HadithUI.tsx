import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import clsx from "clsx"
import parse from "html-react-parser"
import { forwardRef } from "react"
import styles from "./hadithui.module.scss"
import { UIHadith } from "./types"

export interface HadithUIProps extends React.HTMLAttributes<HTMLDivElement> {
  hadith: UIHadith
}

const HadithUI = forwardRef<HTMLDivElement, HadithUIProps>(
  ({ hadith, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={clsx(className, "flex flex-col")} lang={"ar"}>
        <CardHeader>
          <CardTitle className="text-center">{hadith.topic}</CardTitle>
          <CardDescription className="flex">
            <span>
              {hadith.number.toLocaleString("ar-eg", { useGrouping: false })}
            </span>
            <span className="flex-1"></span>
            <span>
              {new Intl.DateTimeFormat("ar-eg", {
                dateStyle: "full",
              }).format(hadith.date)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className={clsx("flex-1 space-y-4 text-center")}>
          <div dir="rtl" className={clsx("font-arabicNas")}>
            {parse(hadith.text)}
          </div>
          {hadith.translations.map((translation) => (
            <div
              key={translation.languageCode}
              lang={translation.languageCode}
              className={clsx(styles["hadith-translation"])}
            >
              {parse(translation.text)}
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-end">
          <p>
            {hadith.books
              .map(
                (book) =>
                  `${book.name}, حديث: ${book.hadithRefNumber.toLocaleString("ar-eg", { useGrouping: false })}`,
              )
              .join(", و")}
          </p>
        </CardFooter>
      </Card>
    )
  },
)
HadithUI.displayName = "HadithUI"
export default HadithUI
