import Series from "@/assets/svg/calligraphy-series.svg"
import DomeInverted from "@/assets/svg/dome-inverted.svg"
import Dome from "@/assets/svg/dome.svg"
import Footer from "@/assets/svg/footer-social.svg"
import Logo from "@/assets/svg/logo.svg"
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
  rumooz,
  urduKasheeda,
  urduNormal,
} from "./fontsLoader"
import styles from "./hadithImage.module.scss"
import "./html2canvasfix.css"

export interface HadithImageGeneratorProps
  extends HTMLAttributes<HTMLDivElement> {
  topic: string
  number: number
  text: string
  color: string
  languageCode: string
  translationText: string
  translationFontScale: number
  bookText: string
}

const HadithImageGenerator = forwardRef<
  HTMLDivElement,
  HadithImageGeneratorProps
>(
  (
    {
      topic,
      number,
      text,
      color,
      languageCode,
      translationText,
      translationFontScale,
      bookText,
      ...props
    },
    ref,
  ) => {
    const hadithParsed = parse(
      sanitizeHtml(text).replaceAll(
        /("|«|&laquo;).+?("|»|&raquo;)/g,
        `<hadith-nas>$&</hadith-nas>`,
      ),
    )
    const translationParsed = parse(
      sanitizeHtml(translationText).replaceAll(
        /("|«|&laquo;).+?("|»|&raquo;)/g,
        `<hadith-nas>$&</hadith-nas>`,
      ),
    )

    return (
      <Card className="aspect-square">
        <div
          ref={ref}
          className={clsx(
            rumooz.variable,
            arabicNas.variable,
            arabicNormal.variable,
            urduNormal.variable,
            urduKasheeda.variable,
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
            <p style={{ marginTop: "-1px", fontFamily: "var(--font-aadil)" }}>
              {topic}
            </p>
            <Series className={"h-full w-auto"} fill={"#ffffff"} />
          </div>
          <div className="absolute right-[5%] top-[5%] mt-[-1px] aspect-[44.09/30.78] h-auto w-[10%]">
            <DomeInverted
              className="absolute inset-0 h-full w-full object-contain text-transparent"
              fill={color}
            />
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
              background: `radial-gradient(circle, rgba(255,255,255,0) 0%, ${color}40 100%)`,
              textAlignLast: "center",
            }}
          >
            <div dir="rtl" className={clsx(styles.hadithArabic)}>
              {hadithParsed}
            </div>
            <div
              lang={languageCode}
              className={clsx(styles.hadithTranslation)}
              style={{
                fontSize: translationFontScale + 100 + "%",
              }}
            >
              {translationParsed}
            </div>
            <div style={{ fontFamily: "var(--font-cairo)", fontSize: "7px" }}>
              {bookText}
            </div>
          </div>
          <div className="absolute bottom-[5%] left-[5%] mb-[-5px] flex h-auto w-[10%] justify-center">
            <Dome
              className="absolute inset-0 h-full w-full object-contain text-transparent"
              fill={color}
            />
            <div className="relative bottom-[-8px] h-auto w-[21px]">
              <Logo className={""} fill={"#ffffff"} />
            </div>
          </div>
          <div
            className={clsx(
              "flex h-[5%] items-center justify-center py-[1%] text-white",
            )}
            style={{ backgroundColor: color }}
          >
            <Footer className={"h-full w-auto"} fill={"#ffffff"} />
          </div>
        </div>
      </Card>
    )
  },
)

HadithImageGenerator.displayName = "HadithImageGenerator"

export default HadithImageGenerator
