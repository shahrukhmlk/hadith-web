"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { IHadithEditable } from "@/data/models/hadith"
import { ILanguage } from "@/data/models/language"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { hadithEditFormSchema } from "./schema"

export interface IHadithEditForm {
  className?: string
  languages: ILanguage[]
  hadith: IHadithEditable | null
}

const HadithEditForm = ({ className, languages, hadith }: IHadithEditForm) => {
  const form = useForm<z.infer<typeof hadithEditFormSchema>>({
    resolver: zodResolver(hadithEditFormSchema),
    defaultValues: {
      num: 0,
      translations: [{ langCode: "ar", topic: "", text: "" }],
      books: [],
    },
  })
  const { control } = form
  const languageFields = useFieldArray({ name: "translations", control })
  const onSubmit = (values: z.infer<typeof hadithEditFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(className, "space-y-4")}
      >
        <FormField
          control={form.control}
          name="num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="Serial Number" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {languageFields.fields.map((item, index) => {
          return (
            <FormField
              key={item.id}
              control={form.control}
              name={`translations.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {
                      languages.find((lang) => lang.code === item.langCode)
                        ?.name
                    }
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="555"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        })}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default HadithEditForm
