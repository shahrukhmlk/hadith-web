"use client"

import HadithImageGenerator from "@/components/hadith/image-generator/HadithImageGenerator"
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
import { Textarea } from "@/components/ui/textarea"
import {
  HadithTranslationSchema,
  IHadith,
  IHadithTranslation,
} from "@/data/models/hadith/hadith"
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
import {
  FormHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface IHadithTranslationEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  hadith: IHadith
  hadithTranslation: IHadithTranslation
}

export const HadithTranslationEditForm = forwardRef<
  HTMLFormElement,
  IHadithTranslationEditFormProps
>(({ hadith, hadithTranslation, ...props }, ref) => {
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
        topic: true,
        text: true,
        fontScale: true,
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
  const deleteHadithTranslation = useDeleteHadithTranslation()

  const form = useForm<IHadithTranslation>({
    resolver: zodResolver(HadithTranslationSchema),
    values: findUniqueHadithTranslation.data,
    defaultValues: {
      hadithID: -1,
      languageCode: "",
      topic: "",
      text: "",
      fontScale: 0,
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
          topic: true,
          text: true,
          fontScale: true,
        },
      },
      {
        onSuccess(data, variables, context) {
          toast.success("Done!")
        },
      },
    )
  }

  const imageDivRef = useRef<HTMLDivElement>(null)
  const panzoomRef = useRef<PanzoomObject>()
  const [imageData, setImageData] = useState("")
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
        className={clsx("flex flex-wrap space-x-4")}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex flex-1 basis-48 flex-col space-y-4">
          <FormField
            control={form.control}
            name={"topic"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Input dir="auto" placeholder="Topic" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex justify-end space-x-2">
            <ButtonLoading
              isLoading={upsertHadithTranslation.isPending}
              disabled={!formState.isDirty}
            >
              Save
            </ButtonLoading>
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
          <HadithImageGenerator
            ref={imageDivRef}
            languageCode={hadithTranslation.languageCode}
            color={hadith.color}
            number={hadith.number}
            topic={hadith.topic}
            text={hadith.text}
            translationFontScale={watch().fontScale}
            translationTopic={watch().topic}
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

          <FormField
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
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant={"secondary"}
              asChild
              disabled={imageData === ""}
            >
              <a href={imageData} target="_blank">
                Download
              </a>
            </Button>
            <ButtonLoading
              type="button"
              onClick={generateImage}
              isLoading={generatingImage}
            >
              Generate
            </ButtonLoading>
          </div>
        </div>
      </form>
      {/*       <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
       */}{" "}
    </Form>
  )
})

HadithTranslationEditForm.displayName = "HadithTranslationEditForm"
