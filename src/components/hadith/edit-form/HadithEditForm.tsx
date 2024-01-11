"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { saveHadith } from "@/data/hadith/save-hadith"
import { IBookWithTranslations } from "@/data/models/book"
import { IHadithEditable } from "@/data/models/hadith"
import { ILanguage } from "@/data/models/language"
import { Status } from "@/data/models/status"
import {
  HadithEditFormData,
  HadithEditFormSchema,
} from "@/data/validators/hadith-edit"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { format } from "date-fns"
import { CalendarDays, Minus, MinusSquare, Plus, ScanEye } from "lucide-react"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import HadithBookSelector from "../book-selector/HadithBookSelector"

export interface IHadithEditForm {
  className?: string
  languages: ILanguage[]
  books: IBookWithTranslations[]
  hadith: IHadithEditable | null
  date: Date
}

const HadithEditForm = ({
  className,
  languages,
  books,
  hadith,
  date,
}: IHadithEditForm) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const defaultBooksValue = [{ bookID: 0, hadithRefNumber: 0 }]
  const defaultTranslationsValue = [
    { languageCode: "ar", topic: "", text: "", fontScale: 0 },
  ]
  const defaultFormValues = {
    number: 0,
    status: Status.draft,
    date: date,
    translations: defaultTranslationsValue,
    books: defaultBooksValue,
    fontScale: 0,
  }
  const form = useForm<HadithEditFormData>({
    resolver: zodResolver(HadithEditFormSchema),
    defaultValues: defaultFormValues,
  })
  const { control } = form
  const translationFields = useFieldArray({ name: "translations", control })
  const bookFields = useFieldArray({ name: "books", control })

  useEffect(() => {
    if (hadith) {
      form.setValue("number", hadith.number || 0)
      form.setValue("date", hadith.date || date)
      form.setValue("status", hadith.status || "draft")
      bookFields.replace(hadith.books)
      translationFields.replace(
        hadith.translations.map((hadithT) => {
          return {
            languageCode: hadithT.languageCode,
            topic: hadithT.topic,
            text: hadithT.text,
            fontScale: hadithT.fontScale || 0,
          }
        }),
      )
    }
  }, [])
  const onSubmit = (values: HadithEditFormData) => {
    console.log(values)
    setLoading(true)
    saveHadith(values)
      .then((res) => {
        setLoading(false)
        toast.success("Hadith saved successfully")
      })
      .catch((e: any) => {
        setLoading(false)
        toast.error(JSON.stringify(e, null, 2))
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx(className, "space-y-4")}
      >
        <div className="flex flex-row flex-wrap gap-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex w-[200px] flex-col ">
                <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        // disable editing date till timezone issue is resolved
                        disabled
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      onDayClick={() => setDatePickerOpen(false)}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="max-w-60 flex-1">
                <FormControl>
                  <Input placeholder="Serial Number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="books"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormLabel>Books</FormLabel>
              <FormMessage />
              <FormControl>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  type="button"
                  onClick={() =>
                    bookFields.append(defaultBooksValue, { shouldFocus: false })
                  }
                >
                  <Plus />
                </Button>
              </FormControl>
            </FormItem>
          )}
        />
        {bookFields.fields.map((item, index) => {
          return (
            <div className="flex flex-row flex-wrap gap-2" key={item.id}>
              <FormField
                control={form.control}
                name={`books.${index}.bookID`}
                render={({ field }) => (
                  <FormItem className="max-w-[200px] flex-1">
                    <FormControl>
                      <HadithBookSelector
                        books={books}
                        selectedBook={books.find(
                          (book) => book.id === field.value,
                        )}
                        onBookSelect={(id) => {
                          form.setValue(`books.${index}.bookID`, id)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`books.${index}.hadithRefNumber`}
                render={({ field }) => (
                  <FormItem className="w-[80px]">
                    <FormControl>
                      <Input
                        placeholder="Hadith Number"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"destructive"} size={"icon"} type="button">
                    <Minus />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => bookFields.remove(index)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )
        })}
        <FormField
          control={form.control}
          name="translations"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2 space-y-0">
              <FormLabel>Translations</FormLabel>
              <FormMessage />
              <FormControl>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  type="button"
                  onClick={() =>
                    translationFields.append(defaultTranslationsValue, {
                      shouldFocus: false,
                    })
                  }
                >
                  <Plus />
                </Button>
              </FormControl>
            </FormItem>
          )}
        />

        {translationFields.fields.map((item, index) => {
          return (
            <div className="flex flex-col gap-2" key={item.id}>
              <FormField
                control={form.control}
                name={`translations.${index}.languageCode`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-baseline gap-2">
                    <FormLabel>Language:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((language, index) => {
                          return (
                            <SelectItem key={index} value={language.code}>
                              {language.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`translations.${index}.topic`}
                render={({ field }) => (
                  <FormItem className="min-w-full flex-1">
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
                name={`translations.${index}.text`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        dir={
                          item.languageCode === "ar" ||
                          item.languageCode === "ur"
                            ? "rtl"
                            : ""
                        }
                        placeholder="555"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row flex-wrap justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" variant={"secondary"}>
                      <ScanEye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {/* <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription>
                      </DialogDescription>
                    </DialogHeader> */}
                    fhgdkjfhg sd hgjhfg jsdhlk
                    <DialogFooter>
                      <FormField
                        control={form.control}
                        name={`translations.${index}.fontScale`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Font Scale</FormLabel>
                            <FormControl>
                              <Slider
                                value={[field.value]}
                                onValueChange={(value) =>
                                  form.setValue(field.name, value[0])
                                }
                                max={100}
                                step={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant={"destructive"}>
                      <MinusSquare className="mr-2 h-4 w-4" /> Remove
                      translation
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => translationFields.remove(index)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )
        })}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value === "published"}
                  onCheckedChange={(checked) => {
                    form.setValue(
                      field.name,
                      checked.valueOf() ? "published" : "draft",
                    )
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish?</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {hadith ? "Save Changes" : "Save new hadith"}
          </Button>
          <Button
            type="button"
            variant={"secondary"}
            onClick={() => form.clearErrors()}
          >
            Clear Errors
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="reset" variant={"destructive"}>
                Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => form.reset(defaultFormValues)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </form>
      {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
    </Form>
  )
}

export default HadithEditForm
