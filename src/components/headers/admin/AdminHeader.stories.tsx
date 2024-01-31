import { Meta, StoryFn } from "@storybook/react"
import AdminHeader, { AdminHeaderProps } from "./AdminHeader"
import { mockAdminHeaderProps } from "./AdminHeader.mocks"

export default {
  title: "Headers/AdminHeader",
  component: AdminHeader,
  argTypes: {},
} as Meta<typeof AdminHeader>

const Template: StoryFn<typeof AdminHeader> = (args) => (
  <AdminHeader {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockAdminHeaderProps.base,
} as AdminHeaderProps
