import DatePickerField from "@/components/inputs/date-picker/DatePickerField"
import SearchableSelectInput from "@/components/inputs/searchable-select/SearchableSelectInput"
import { HadithEditor } from "@/components/rte/rte"
import { ButtonConfirm } from "@/components/ui/buttons/ButtonConfirm"
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
import { ITopic } from "@/data/models/topic/topic"
import {
  useCreateTopic,
  useDeleteHadith,
  useFindManyTopic,
  useFindUniqueHadith,
  useUpsertHadith,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData } from "@tanstack/react-query"
import clsx from "clsx"
import { omit } from "lodash"
import { forwardRef, useState } from "react"
import { useForm } from "react-hook-form"

export interface HadithEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  hadith?: IHadith
  onSave?: (id: number) => void
  onDelete?: () => void
}

const HadithEditForm = forwardRef<HTMLFormElement, HadithEditFormProps>(
  ({ hadith, onSave, onDelete, className, ...props }, ref) => {
    const [topicSearch, setTopicSearch] = useState<string>("")
    const findUniqueHadith = useFindUniqueHadith(
      {
        where: {
          id: hadith?.id,
        },
        select: {
          id: true,
          number: true,
          date: true,
          status: true,
          topicID: true,
          text: true,
        },
      },
      { initialData: hadith, enabled: !!hadith },
    )

    const findManyTopic = useFindManyTopic(
      {
        where: {
          OR: [
            {
              title: {
                contains: topicSearch?.length ? topicSearch : undefined,
              },
            },
            {
              id: {
                equals: topicSearch?.length
                  ? undefined
                  : findUniqueHadith.data?.topicID,
              },
            },
          ],
        },
        select: { id: true, title: true },
        take: 4,
      },
      {
        placeholderData: (previousData, previousQuery) => previousData,
        select(data) {
          return data.map((topic) => {
            return {
              value: topic.id.toString(),
              label: topic.title,
            }
          })
        },
      },
    )

    const createTopic = useCreateTopic()

    const upsertHadith = useUpsertHadith()

    const deleteHadith = useDeleteHadith({
      onSuccess(data, variables, context) {
        onDelete && onDelete()
      },
    })

    const form = useForm({
      resolver: zodResolver(HadithSchema.partial({ id: true })),
      values: findUniqueHadith.data,
      defaultValues: {
        id: 0,
        // @ts-ignore
        number: "",
        status: Status.draft,
        // @ts-ignore
        date: "",
        topicID: 0,
        text: "",
      },
    })

    const onSubmit = (values: IHadith) => {
      upsertHadith.mutate(
        {
          create: omit(values, ["id"]),
          where: { id: values.id },
          update: values,
          select: {
            id: true,
            number: true,
            date: true,
            status: true,
            text: true,
          },
        },
        {
          onSuccess(data, variables, context) {
            onSave && onSave(data?.id ?? 0)
          },
        },
      )
    }

    return (
      <>
        <Form {...form}>
          <form
            ref={ref}
            className={clsx("space-y-4", className)}
            onSubmit={form.handleSubmit(onSubmit)}
            {...props}
          >
            <div className="flex flex-wrap gap-4">
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
                  <FormItem className="basis-20">
                    <FormControl>
                      <Input placeholder="Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"topicID"}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <SearchableSelectInput
                        items={findManyTopic.data ?? []}
                        selectedItem={findManyTopic.data?.find(
                          (item) => parseInt(item.value) === field.value,
                        ) /*  ?? createTopic.data */}
                        isLoading={
                          findManyTopic.isFetching || createTopic.isPending
                        }
                        selectText="Select Topic"
                        onItemSelect={(item) =>
                          field.onChange(parseInt(item.value))
                        }
                        filterValue={topicSearch}
                        onFilterChange={setTopicSearch}
                        onClickCreateNew={(text) => {
                          createTopic.mutate({
                            data: { title: text },
                            select: { id: true, title: true },
                          })
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={"text"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    {/* <HadithEditor /> */}
                    <Textarea
                      dir="auto"
                      placeholder="Text..."
                      rows={5}
                      {...field}
                      className="resize-none text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap justify-end gap-2">
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
                {findUniqueHadith.data?.status === Status.published
                  ? "Update"
                  : "Publish"}
              </ButtonLoading>
              <div className="flex-1"></div>
              {findUniqueHadith.data && (
                <ButtonConfirm
                  type="button"
                  variant={"destructive"}
                  isLoading={deleteHadith.isPending}
                  onClick={() => {
                    deleteHadith.mutate({
                      where: { id: findUniqueHadith.data.id },
                    })
                  }}
                >
                  Delete
                </ButtonConfirm>
              )}
            </div>
          </form>
        </Form>
      </>
    )
  },
)

HadithEditForm.displayName = "HadithEditForm"

export default HadithEditForm
