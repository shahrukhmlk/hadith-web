import DataTable from "@/components/ui/data-table/DataTable"
import { getLanguages } from "@/data/language/getLanguages"
import { columns } from "./columns"

export default async function Home() {
  const languages = await getLanguages()
  return <DataTable columns={columns} data={languages} />
}
