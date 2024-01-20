import { Meta, StoryFn } from "@storybook/react"
import AdminSidebar, { AdminSidebarProps } from "./AdminSidebar"
import { mockAdminSidebarProps } from "./AdminSidebar.mocks"

export default {
  title: "Sidebars/AdminSidebar",
  component: AdminSidebar,
  argTypes: {},
} as Meta<typeof AdminSidebar>

const Template: StoryFn<typeof AdminSidebar> = (args) => (
  <AdminSidebar {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockAdminSidebarProps.base,
} as AdminSidebarProps
