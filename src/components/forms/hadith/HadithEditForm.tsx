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
import { ROUTES } from "@/constants/routes"
import { HadithSchema, IHadith } from "@/data/models/hadith/hadith"
import { Status } from "@/data/models/status/status"
import {
  useDeleteHadith,
  useFindUniqueHadith,
  useUpsertHadith,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { Route } from "next"
import { useRouter } from "next/navigation"
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
          topicID: true,
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

    const deleteHadith = useDeleteHadith()
    const router = useRouter()

    const form = useForm({
      resolver: zodResolver(HadithSchema),
      values: findUniqueHadith.data,
      defaultValues: {
        id: -1,
        // @ts-ignore
        number: "",
        status: Status.draft,
        // @ts-ignore
        date: "",
        color: "#000000",
        topicID: -1,
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
              name={"text"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      dir="auto"
                      placeholder="Text..."
                      {...field}
                      className="resize-none text-base"
                    />
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
          <div className="flex-1">
            <ButtonLoading
              type="button"
              variant={"destructive"}
              isLoading={deleteHadith.isPending}
              onClick={() => {
                deleteHadith.mutate(
                  { where: { id: findUniqueHadith.data.id } },
                  {
                    onSuccess(data, variables, context) {
                      router.replace(ROUTES.ADMIN.HADITHS as Route)
                    },
                  },
                )
              }}
            >
              Delete Topic
            </ButtonLoading>
          </div>
        </div>
      </>
    )
  },
)

HadithEditForm.displayName = "HadithEditForm"

export default HadithEditForm
