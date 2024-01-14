import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"
import { IHadith } from "@/data/models/hadith"
import Panzoom from "@panzoom/panzoom"
import html2canvas from "html2canvas"
import { ScanEye } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import HadithImageGenerator from "../image-generator/HadithImageGenerator"

export interface HadithImagePreviewProps extends IHadith {
  fontScale: number
}

const HadithImagePreview = ({ ...props }: HadithImagePreviewProps) => {
  const imageDivRef = useRef(null)
  const [imageData, setImageData] = useState("null")
  useEffect(() => {
    if (imageDivRef.current) {
      Panzoom(imageDivRef.current, {
        // contain: "outside",
        startScale: 1,
      })
    }
    console.log(imageDivRef.current)
  })

  const generateImage = () => {
    if (imageDivRef.current) {
      html2canvas(imageDivRef.current, {}).then((canvas) => {
        return setImageData(canvas.toDataURL("png"))
      })
    }
  }
  return (
    <>
      <HadithImageGenerator {...props} ref={imageDivRef} />
      <Button onClick={generateImage}>dgdfg</Button>
      <Button variant={"link"} asChild>
        <a href={imageData} target="_blank">
          Download
        </a>
      </Button>
    </>
  )
}

export default HadithImagePreview
