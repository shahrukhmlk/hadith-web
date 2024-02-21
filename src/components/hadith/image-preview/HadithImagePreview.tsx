// @ts-ignore
import Series from "@/assets/svg/calligraphy-series.svg?url"
// @ts-ignore
import Footer from "@/assets/svg/footer-social.svg?url"
// @ts-ignore
import Logo from "@/assets/svg/logo.svg?url"
// @ts-ignore
import Net from "@/assets/svg/net.svg?url"
import { Card } from "@/components/ui/card"
import clsx from "clsx"
import parse from "html-react-parser"
import { forwardRef, HTMLAttributes } from "react"
import sanitizeHtml from "sanitize-html"
import {
  aadil,
  arabicNas,
  arabicNormal,
  cairo,
  rumoozAr,
  urduKasheeda,
  urduNormal,
} from "../../../lib/fonts/fontsLoader"
import styles from "./hadithImage.module.scss"
import "./html2canvasfix.css"
import { addRamzToText, arabicRumooz, rumoozConfigs } from "@/lib/rumooz"

export interface HadithImagePreviewProps
  extends HTMLAttributes<HTMLDivElement> {
  topic: string
  number: number
  text: string
  color: string
  fontScale: number
  languageCode: string
  translationText: string
  translationFontScale: number
  bookText: string
}

const HadithImagePreview = forwardRef<HTMLDivElement, HadithImagePreviewProps>(
  (
    {
      topic,
      number,
      text,
      color,
      fontScale,
      languageCode,
      translationText,
      translationFontScale,
      bookText,
      ...props
    },
    ref,
  ) => {
    const replaceQuotes = (text: string) => {
      return text.replaceAll(
        /("|«|&laquo;).+?("|»|&raquo;)/g,
        `<span class="${styles["hadith-nas"]}">$&</span>`,
      )
    }
    const formattedText = addRamzToText(replaceQuotes(text), arabicRumooz, {
      start: `<span lang="ar" class="${styles["ramz"]}">`,
      end: `</span>`,
    })

    const formattedTranslation = addRamzToText(
      replaceQuotes(translationText),
      rumoozConfigs[languageCode],
      {
        start: `<span lang="${languageCode}" class="${styles["ramz"]}">`,
        end: `</span>`,
      },
    )

    return (
      <Card className="p-6">
        <div
          ref={ref}
          className={clsx(
            rumoozAr.variable,
            urduNormal.variable,
            aadil.variable,
            cairo.variable,
            "relative flex h-[300px] w-[300px] flex-col items-stretch bg-white text-[10px] text-black",
          )}
          style={{ "--color-hadith": color } as React.CSSProperties}
        >
          <div
            className={clsx(
              "flex h-[5%] items-center justify-between px-[3%] py-[1%] text-white",
            )}
            style={{ backgroundColor: color }}
          >
            <p
              className="text-[8px]"
              style={{ fontFamily: "var(--font-aadil)" }}
            >
              {topic}
            </p>
            <img className={"h-full w-auto"} src={Series.src} alt="" />
          </div>
          <div
            className={clsx(
              "absolute right-[5%] top-[5%] mt-[-1px] aspect-[44.09/30.78] h-auto w-[10%]",
              styles["dome-inverted"],
            )}
            style={{ backgroundColor: color }}
          >
            <p
              className="relative z-10 text-center text-white"
              style={{ fontFamily: "var(--font-arabic-nas)" }}
            >
              {number.toLocaleString("ar-EG", { useGrouping: false })}
            </p>
          </div>
          <div
            className={clsx(
              "flex flex-1 flex-col items-center justify-around overflow-clip whitespace-pre-line p-[5%] text-justify align-baseline text-[1em]",
            )}
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0) 0%, ${color}30 100%), url("${Net.src}")`,
              textAlignLast: "center",
            }}
          >
            <div
              lang="ar"
              dir="rtl"
              className={clsx(styles.hadithArabic)}
              style={{
                fontSize: fontScale + 100 + "%",
              }}
            >
              {parse(formattedText)}
            </div>
            <div
              lang={languageCode}
              className={clsx(styles.hadithTranslation)}
              style={{
                fontSize: translationFontScale + 100 + "%",
              }}
            >
              {parse(formattedTranslation)}
            </div>
            <div
              dir="rtl"
              className="text-[7px] font-medium"
              style={{ fontFamily: "var(--font-cairo)" }}
            >
              {bookText}
            </div>
          </div>
          <div
            className={clsx(
              "absolute bottom-[5%] left-[5%] aspect-[44.09/30.78] h-auto w-[10%]",
              styles.dome,
            )}
            style={{ backgroundColor: color }}
          ></div>
          <img
            src={Logo.src}
            className={"absolute bottom-[1%] left-[6.5%] h-auto w-[21px]"}
          />
          <div
            className={clsx(
              "flex h-[5%] items-center justify-center py-[1%] text-white",
            )}
            style={{ backgroundColor: color }}
          >
            <img src={Footer.src} alt="" className={"h-full w-auto"} />
          </div>
        </div>
      </Card>
    )
  },
)

HadithImagePreview.displayName = "HadithImageGenerator"

export default HadithImagePreview
