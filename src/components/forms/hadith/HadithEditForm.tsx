import DatePickerField from "@/components/inputs/date-picker/DatePickerField"
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
import { Textarea } from "@/components/ui/textarea"
import { HadithSchema, IHadith } from "@/data/models/hadith/hadith"
import { Status } from "@/data/models/status/status"
import { useFindUniqueHadith, useUpsertHadith } from "@/lib/hooks/query"
import { deleteHadith } from "@/serverActions/hadith/deleteHadith"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface HadithEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  hadith: IHadith
}

const HadithEditForm = forwardRef<HTMLFormElement, HadithEditFormProps>(
  ({ hadith, ...props }, ref) => {
    const findUniqueHadith = useFindUniqueHadith(
      {
        where: {
          id: hadith.id,
        },
        select: {
          id: true,
          number: true,
          date: true,
          status: true,
          color: true,
          topic: true,
          text: true,
          fontScale: true,
        },
      },
      { initialData: hadith },
    )
    const upsertHadith = useUpsertHadith({
      onSuccess(data, variables, context) {
        toast.success("Done!")
      },
    })

    const form = useForm<IHadith>({
      resolver: zodResolver(HadithSchema.partial({ id: true })),
      values: findUniqueHadith.data,
      defaultValues: {
        // @ts-ignore
        number: "",
        status: Status.draft,
        // @ts-ignore
        date: "",
        color: "#000000",
        topic: "",
        text: "",
        // @ts-ignore
        fontScale: "",
      },
    })

    const onSubmit = (values: IHadith) => {
      upsertHadith.mutate({
        create: values,
        where: { id: values.id },
        update: values,
        select: {
          id: true,
          number: true,
          date: true,
          status: true,
          color: true,
          topic: true,
          text: true,
          fontScale: true,
        },
      })
      //translationsRef.current.forEach((el) => el.requestSubmit())
    }
    if (!findUniqueHadith.data) {
      return null
    }
    return (
      <>
        <Form {...form}>
          <form
            ref={ref}
            className={clsx("space-y-4")}
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
          >
            <FormField
              control={form.control}
              name={"date"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePickerField
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"number"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Number" {...field} />
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
                  <FormControl>
                    <Input type="color" {...field} />
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
                  <FormControl>
                    <Input placeholder="fontScale" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name={"topic"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="Topic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"text"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea dir="auto" placeholder="Text..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-end space-x-2">
          <ButtonLoading
            type="button"
            variant={"secondary"}
            isLoading={
              upsertHadith.isPending &&
              form.getValues("status") === Status.draft
            }
            onClick={() => {
              form.setValue("status", Status.draft)
              form.handleSubmit(onSubmit)()
            }}
          >
            Save Draft
          </ButtonLoading>
          <ButtonLoading
            isLoading={
              upsertHadith.isPending &&
              form.getValues("status") === Status.published
            }
            onClick={() => {
              form.setValue("status", Status.published)
              form.handleSubmit(onSubmit)()
            }}
          >
            {upsertHadith.data?.status === Status.published
              ? "Update"
              : "Publish"}
          </ButtonLoading>
          <form
            action={(e) => deleteHadith(hadith.id)}
            className="flex flex-1 justify-end"
          >
            <ButtonLoading variant={"destructive"}>Delete Hadith</ButtonLoading>
          </form>
        </div>
      </>
    )
  },
)

HadithEditForm.displayName = "HadithEditForm"

export default HadithEditForm
