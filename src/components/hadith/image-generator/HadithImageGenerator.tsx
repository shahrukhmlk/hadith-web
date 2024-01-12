import { IHadith } from "@/data/models/hadith"
import clsx from "clsx"

export interface HadithImageGeneratorProps extends IHadith {
  fontScale: number
}

const HadithImageGenerator = (props: HadithImageGeneratorProps) => {
  return (
    <div
      className={clsx(
        "hadithImage",
        "flex h-[500px] w-[500px] flex-col items-stretch",
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
          "flex flex-1 items-center justify-center bg-white text-black",
        )}
      >
        <p>{props.text}</p>
      </div>
      <div className={clsx("flex h-[50px] items-center bg-slate-800")}>
        Footer
      </div>
    </div>
  )
}

export default HadithImageGenerator
