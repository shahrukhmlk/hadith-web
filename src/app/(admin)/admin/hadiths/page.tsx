import { DataTable } from "@/components/ui/data-table/DataTable"
import { Status } from "@/data/models/status"
import { columns, Hadith } from "./columns"

export default function Home({}: {}) {
  const mockData: Hadith[] = [
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 0,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
    {
      id: 1,
      number: 6565,
      status: Status.published,
      topic: "Topic",
    },
  ]
  return (
    <main className="flex h-full w-full justify-center p-4">
      <DataTable columns={columns} data={mockData} />
    </main>
  )
}
