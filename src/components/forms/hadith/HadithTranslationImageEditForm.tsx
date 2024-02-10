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
  useUpsertHadithTranslationImage,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import Panzoom, { PanzoomObject } from "@panzoom/panzoom"
import clsx from "clsx"
import html2canvas from "html2canvas"
import { FormHTMLAttributes, forwardRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
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
  const upsertHadithTranslationImage = useUpsertHadithTranslationImage()
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
          onSave && data && onSave(data.hadithID, data.languageCode)
        },
      },
    )
  }

  const imageDivRef = useRef<HTMLDivElement>(null)
  const panzoomRef = useRef<PanzoomObject>()
  const [imageData, setImageData] = useState<string>()
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
    panzoomRef.current?.reset({ animate: false, startScale: 5 })

    setTimeout(() => {
      if (imageDivRef.current) {
        html2canvas(imageDivRef.current, {})
          .then((canvas) => setImageData(canvas.toDataURL("png", 1)))
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setGeneratingImage(false)
            handleSubmit(onSubmit)()
          })
      }
    }, 1000)
  }

  if (!findUniqueHadithTranslationImage.data) {
    return null
  }

  const { data } = findUniqueHadithTranslationImage
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
          color={data.color}
          number={data.hadithTranslation.hadith.number}
          fontScale={data.hadithFontScale}
          topic={data.hadithTranslation.hadith.topic.title}
          text={data.hadithTranslation.hadith.text}
          translationFontScale={data.translationFontScale}
          translationText={data.hadithTranslation.text}
          bookText={data.hadithTranslation.hadith.books
            .map(
              (book) =>
                `${book.book.name}: ${book.hadithRefNumber.toLocaleString("ar-eg", { useGrouping: false })}`,
            )
            .join(", ")}
        />
        <FormField
          control={form.control}
          name={"hadithFontScale"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Scale</FormLabel>
              <FormControl>
                <Slider
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
            <FormItem>
              <FormLabel>Translation Font Scale</FormLabel>
              <FormControl>
                <Slider
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
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
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
          <Button
            type="button"
            variant={"secondary"}
            asChild
            disabled={!!imageData}
          >
            <a href={imageData} target="_blank">
              Download
            </a>
          </Button>
        </div>
      </form>
    </Form>
  )
})

HadithTranslationImageEditForm.displayName = "HadithTranslationImageEditForm"
