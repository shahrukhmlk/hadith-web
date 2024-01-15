import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { IHadith } from "@/data/models/hadith"
import Panzoom, { PanzoomObject } from "@panzoom/panzoom"
import html2canvas from "html2canvas"
import { Image, Loader2, ScanEye } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import HadithImageGenerator from "../image-generator/HadithImageGenerator"

export interface HadithImagePreviewProps extends IHadith {
  fontScale: number
  onFontScaleChange: (fontScale: number) => void
}

const HadithImagePreview = ({ ...props }: HadithImagePreviewProps) => {
  const imageDivRef = useRef<HTMLDivElement>(null)
  const [imageData, setImageData] = useState("null")
  const [mounted, setMounted] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)
  let panzoom: PanzoomObject | undefined
  useEffect(() => {
    if (imageDivRef.current) {
      panzoom = Panzoom(imageDivRef.current, {
        //contain: "outside",
        startScale: 1,
      })
      imageDivRef.current.parentElement?.addEventListener(
        "wheel",
        panzoom.zoomWithWheel,
      )
    }
    return () => {
      panzoom?.destroy()
    }
  }, [mounted])

  const generateImage = () => {
    setGeneratingImage(true)
    if (imageDivRef.current) {
      html2canvas(imageDivRef.current, {})
        .then((canvas) => {
          setImageData(canvas.toDataURL("png"))
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => setGeneratingImage(false))
    }
  }
  return (
    <Dialog onOpenChange={setMounted}>
      <DialogTrigger asChild>
        <Button type="button" variant={"secondary"}>
          <ScanEye className="mr-2 h-4 w-4" /> Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>
            Zoom, drag set font scale and when satidfied click generate.
          </DialogDescription>
        </DialogHeader>

        <HadithImageGenerator {...props} ref={imageDivRef} />
        <DialogFooter>
          <Slider
            value={[props.fontScale]}
            onValueChange={(value) => props.onFontScaleChange(value[0])}
            min={-99}
            max={100}
            step={1}
          />
          <Button onClick={generateImage} disabled={generatingImage}>
            {generatingImage ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Image className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default HadithImagePreview
