import { IHadith } from "@/data/models/hadith"
import Panzoom from "@panzoom/panzoom"
import clsx from "clsx"
import parse from "html-react-parser"
import { useEffect, useRef } from "react"
import sanitizeHtml from "sanitize-html"
import { arabicNas, arabicNormal, rumooz, urduKasheeda } from "./fontsLoader"
import styles from "./hadithImage.module.scss"

export interface HadithImageGeneratorProps extends IHadith {
  fontScale: number
  zoomLevel?: number
}

const HadithImageGenerator = (props: HadithImageGeneratorProps) => {
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
  useEffect(() => {
    if (imageDivRef.current) {
      const panzoom = Panzoom(imageDivRef.current, {
        // contain: "outside",
        startScale: props.zoomLevel || 1,
      })
    }
  }, [])
  const imageDivRef = useRef(null)
  return (
    <div>
      <div
        ref={imageDivRef}
        lang={props.lang}
        className={clsx(
          styles.hadithImage,
          rumooz.variable,
          arabicNas.variable,
          arabicNormal.variable,
          urduKasheeda.variable,
          "flex h-[1024px] w-[1024px] flex-col items-stretch",
        )}
      >
        <div
          className={clsx(
            "flex h-[50px] items-center justify-between bg-slate-800",
          )}
        >
          <p>{props.topic}</p>
          <p>{props.num}</p>
        </div>
        <div
          className={clsx(
            "flex flex-1 items-center justify-center bg-white text-[20px]",
          )}
        >
          <div
            className="w-full whitespace-pre-line p-4 text-center align-baseline text-black"
            style={{
              fontSize: props.fontScale / 100 + 1 + "em",
            }}
          >
            {parsedHTML}
          </div>
        </div>
        <div className={clsx("flex h-[50px] items-center bg-slate-800")}>
          Footer
        </div>
      </div>
    </div>
  )
}

export default HadithImageGenerator
