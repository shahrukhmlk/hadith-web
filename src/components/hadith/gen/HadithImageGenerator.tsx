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
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { IHadith } from "@/data/models/hadith/hadith"
import { IHadithBook } from "@/data/models/hadith/hadith-book"
import {
  HadithTranslationSchema,
  IHadithTranslation,
} from "@/data/models/hadith/hadith-translation"
import { ITopic } from "@/data/models/topic/topic"
import {
  useDeleteHadithTranslation,
  useFindManyHadithBook,
  useFindUniqueHadithTranslation,
  useUpsertHadithTranslation,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import Panzoom, { PanzoomObject } from "@panzoom/panzoom"
import clsx from "clsx"
import html2canvas from "html2canvas"
import { FormHTMLAttributes, forwardRef, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import HadithImagePreview from "../image-preview/HadithImagePreview"

export interface IHadithTranslationEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  hadith: IHadith
  hadithTopic: ITopic
  hadithTranslation: IHadithTranslation
  onSave?: (id: number, languageCode: string) => void
  onDelete?: () => void
}

export const HadithTranslationEditForm = forwardRef<
  HTMLFormElement,
  IHadithTranslationEditFormProps
>(
  (
    { hadith, hadithTopic, hadithTranslation, onSave, onDelete, ...props },
    ref,
  ) => {
    const findUniqueHadithTranslation = useFindUniqueHadithTranslation(
      {
        where: {
          hadithID_languageCode: {
            languageCode: hadithTranslation.languageCode,
            hadithID: hadithTranslation.hadithID,
          },
        },
        select: {
          hadithID: true,
          languageCode: true,
          text: true,
        },
      },
      { initialData: hadithTranslation },
    )
    const findManyHadithBook = useFindManyHadithBook({
      where: {
        hadithID: hadith.id,
      },
      select: {
        book: {
          select: {
            name: true,
          },
        },
        hadithRefNumber: true,
      },
    })
    const upsertHadithTranslation = useUpsertHadithTranslation()
    const deleteHadithTranslation = useDeleteHadithTranslation({
      onSuccess(data, variables, context) {
        onDelete && onDelete()
      },
    })

    const form = useForm({
      resolver: zodResolver(HadithTranslationSchema),
      values: findUniqueHadithTranslation.data,
      defaultValues: {
        hadithID: -1,
        languageCode: "",
        text: "",
      },
    })
    const { watch, control, handleSubmit, formState } = form

    const onSubmit = (values: IHadithTranslation) => {
      upsertHadithTranslation.mutate(
        {
          create: values,
          where: {
            hadithID_languageCode: {
              languageCode: hadithTranslation.languageCode,
              hadithID: hadithTranslation.hadithID,
            },
          },
          update: values,
          select: {
            hadithID: true,
            languageCode: true,
            text: true,
          },
        },
        {
          onSuccess(data, variables, context) {},
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
    return (
      <Form {...form}>
        <form
          ref={ref}
          className={clsx("flex flex-wrap gap-4")}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <div className="flex flex-1 basis-48 flex-col space-y-4">
            <FormField
              control={form.control}
              name={"text"}
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      dir="auto"
                      placeholder="Text..."
                      {...field}
                      className="flex-1 resize-none text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name={"fontScale"}
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
            /> */}
            <div className="flex space-x-2">
              <ButtonLoading
                isLoading={upsertHadithTranslation.isPending}
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
              <div className="flex-1"></div>
              <ButtonLoading
                type="button"
                variant={"destructive"}
                isLoading={deleteHadithTranslation.isPending}
                onClick={() => {
                  deleteHadithTranslation.mutate({
                    where: {
                      hadithID_languageCode: {
                        hadithID: hadithTranslation.hadithID,
                        languageCode: hadithTranslation.languageCode,
                      },
                    },
                  })
                }}
              >
                Delete
              </ButtonLoading>
            </div>
          </div>
          <div className="flex-1 basis-48 space-y-4">
            <HadithImagePreview
              ref={imageDivRef}
              languageCode={hadithTranslation.languageCode}
              color={"#000000"}
              number={hadith.number}
              fontScale={0}
              topic={hadithTopic.title}
              text={hadith.text}
              translationFontScale={0}
              translationText={watch().text}
              bookText={
                findManyHadithBook.data
                  ?.map(
                    (book) =>
                      `${book.book.name}: ${book.hadithRefNumber.toLocaleString("ar-eg", { useGrouping: false })}`,
                  )
                  .join() ?? ""
              }
            />
          </div>
        </form>
      </Form>
    )
  },
)

HadithTranslationEditForm.displayName = "HadithTranslationEditForm"
