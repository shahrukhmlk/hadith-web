import { Meta, StoryFn } from "@storybook/react"
import DataTable, { DataTableProps } from "./DataTable"
import { mockDataTableProps } from "./DataTable.mocks"

export default {
  title: "Ui/DataTable",
  component: DataTable,
  argTypes: {},
} as Meta<typeof DataTable>

const Template: StoryFn<typeof DataTable> = (args) => (
  <DataTable {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockDataTableProps.base,
} as DataTableProps
