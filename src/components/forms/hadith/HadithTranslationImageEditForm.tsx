"use client"

import { Button } from "@/components/ui/button"
import { ButtonLoading } from "@/components/ui/buttons/ButtonLoading"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  HadithTranslationImageSchema,
  IHadithTranslationImage,
} from "@/data/models/hadith/hadith-translation-image"
import {
  useDeleteHadithTranslationImage,
  useFindUniqueHadithTranslationImage,
  useUpdateManyHadithTranslationImage,
  useUpsertHadithTranslationImage,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import Panzoom, { PanzoomObject } from "@panzoom/panzoom"
import clsx from "clsx"
import { toPng, toSvg } from "html-to-image"
import { FormHTMLAttributes, forwardRef, useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import HadithImagePreview from "../../hadith/image-preview/HadithImagePreview"

export interface IHadithTranslationImageEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  hadithID: number
  languageCode: string
  onSave?: (id: number, languageCode: string) => void
  onDelete?: () => void
}

export const HadithTranslationImageEditForm = forwardRef<
  HTMLFormElement,
  IHadithTranslationImageEditFormProps
>(({ hadithID, languageCode, onSave, onDelete, className, ...props }, ref) => {
  const findUniqueHadithTranslationImage = useFindUniqueHadithTranslationImage({
    where: {
      hadithID_languageCode: {
        languageCode: languageCode,
        hadithID: hadithID,
      },
    },
    select: {
      hadithID: true,
      languageCode: true,
      color: true,
      hadithFontScale: true,
      translationFontScale: true,
      hadithTranslation: {
        select: {
          text: true,
          hadith: {
            select: {
              number: true,
              text: true,
              topic: {
                select: {
                  title: true,
                },
              },
              books: {
                select: {
                  hadithRefNumber: true,
                  book: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const { data } = findUniqueHadithTranslationImage

  const upsertHadithTranslationImage = useUpsertHadithTranslationImage()
  const updateManyHadithTranslationImage = useUpdateManyHadithTranslationImage()

  const deleteHadithTranslationImage = useDeleteHadithTranslationImage({
    onSuccess(data, variables, context) {
      onDelete && onDelete()
    },
  })

  const form = useForm({
    resolver: zodResolver(HadithTranslationImageSchema),
    values: findUniqueHadithTranslationImage.data,
    defaultValues: {
      hadithID: -1,
      languageCode: "",
      color: "#000000",
      hadithFontScale: 0,
      translationFontScale: 0,
    },
  })
  const { handleSubmit, formState } = form
  const colorWatch = useWatch({ control: form.control, name: "color" })
  const hadithFontScaleWatch = useWatch({
    control: form.control,
    name: "hadithFontScale",
  })
  const translationFontScaleWatch = useWatch({
    control: form.control,
    name: "translationFontScale",
  })

  const onSubmit = (values: IHadithTranslationImage) => {
    upsertHadithTranslationImage.mutate(
      {
        create: values,
        where: {
          hadithID_languageCode: {
            languageCode: languageCode,
            hadithID: hadithID,
          },
        },
        update: values,
        select: {
          hadithID: true,
          languageCode: true,
          color: true,
          hadithFontScale: true,
          translationFontScale: true,
        },
      },
      {
        onSuccess(data, variables, context) {
          updateManyHadithTranslationImage.mutate({
            where: {
              hadithID: hadithID,
            },
            data: {
              color: values.color,
            },
          })
          onSave && data && onSave(data.hadithID, data.languageCode)
        },
      },
    )
  }

  const imageDivRef = useRef<HTMLDivElement>(null)
  const panzoomRef = useRef<PanzoomObject>()
  const [imageDataURL, setImageDataURL] = useState<string>()
  const [imageBlob, setImageBlob] = useState<Blob>()
  const [generatingImage, setGeneratingImage] = useState(false)
  if (imageDivRef.current) {
    if (!panzoomRef.current) {
      panzoomRef.current = Panzoom(imageDivRef.current, {
        //contain: "outside",
        //startY: 150,
        startScale: 1,
        canvas: true,
      })
      imageDivRef.current.parentElement?.addEventListener(
        "wheel",
        panzoomRef.current.zoomWithWheel,
      )
    }
  }

  const generateImage = () => {
    setGeneratingImage(true)
    panzoomRef.current?.reset({ animate: false })
    setTimeout(async () => {
      if (imageDivRef.current && data) {
        try {
          const url = await toPng(imageDivRef.current, {
            canvasWidth: 1024,
            canvasHeight: 1024,
          })
          setImageDataURL(url)
          setImageBlob(await (await fetch(url)).blob())
        } catch (error) {
          console.error(error)
          toast.error("An error occured while generating image.")
        } finally {
          setGeneratingImage(false)
        }
      }
    }, 1000)
  }

  const copyImageWithText = async () => {
    if (!imageDataURL || !imageBlob || !data) {
      toast.error("Error with image or data")
      return
    }
    try {
      const image = new ClipboardItem({ [imageBlob.type]: imageBlob })
      await navigator.clipboard.write([image])
      toast.success("Copied image to clipboard.")
    } catch (error) {
      toast.error("An error occured while copying image.")
      console.error(error)
    }
  }

  const shareImageWithText = async () => {
    if (!imageDataURL || !imageBlob || !data) {
      toast.error("Error with image or data")
      return
    }
    try {
      const files = [
        new File(
          [imageBlob],
          `${data.hadithTranslation.hadith.number}-${data.languageCode}.png`,
          {
            type: imageBlob.type,
          },
        ),
      ]
      if (navigator.canShare({ files })) {
        await navigator.share({
          files,
          title: "Images",
          text: `${data.hadithTranslation.text}`,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!data) {
    return null
  }

  return (
    <Form {...form}>
      <form
        ref={ref}
        className={clsx("space-y-4", className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <HadithImagePreview
          ref={imageDivRef}
          languageCode={languageCode}
          color={colorWatch}
          number={data.hadithTranslation.hadith.number}
          fontScale={hadithFontScaleWatch}
          topic={data.hadithTranslation.hadith.topic.title}
          text={data.hadithTranslation.hadith.text}
          translationFontScale={translationFontScaleWatch}
          translationText={data.hadithTranslation.text}
          bookText={data.hadithTranslation.hadith.books
            .map(
              (book) =>
                `${book.book.name}, حديث: ${book.hadithRefNumber.toLocaleString("ar-eg", { useGrouping: false })}`,
            )
            .join("\n و")}
        />
        <div className="flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name={"hadithFontScale"}
            render={({ field }) => (
              <FormItem className="basis-52">
                <FormLabel>Font Scale</FormLabel>
                <FormControl>
                  <Slider
                    className="h-9"
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    min={-99}
                    max={100}
                    step={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"translationFontScale"}
            render={({ field }) => (
              <FormItem className="basis-52">
                <FormLabel>Translation Font Scale</FormLabel>
                <FormControl>
                  <Slider
                    className="h-9"
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    min={-99}
                    max={100}
                    step={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"color"}
            render={({ field }) => (
              <FormItem className="basis-20">
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Color" type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-wrap space-x-2">
          <ButtonLoading
            isLoading={upsertHadithTranslationImage.isPending}
            disabled={!formState.isDirty}
          >
            Save
          </ButtonLoading>
          <ButtonLoading
            type="button"
            onClick={generateImage}
            isLoading={generatingImage}
          >
            Generate
          </ButtonLoading>
          {!!imageDataURL && (
            <>
              <Button
                type="button"
                variant={"secondary"}
                disabled={!imageDataURL}
                onClick={copyImageWithText}
              >
                Copy
              </Button>
              {!!navigator.share && (
                <Button
                  type="button"
                  variant={"secondary"}
                  disabled={!imageBlob}
                  onClick={shareImageWithText}
                >
                  Share
                </Button>
              )}
            </>
          )}
        </div>
      </form>
    </Form>
  )
})

HadithTranslationImageEditForm.displayName = "HadithTranslationImageEditForm"
