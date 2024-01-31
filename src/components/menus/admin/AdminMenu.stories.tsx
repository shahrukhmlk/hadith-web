import { Meta, StoryFn } from "@storybook/react"
import AdminMenu, { AdminMenuProps } from "./AdminMenu"
import { mockAdminMenuProps } from "./AdminMenu.mocks"

export default {
  title: "Menus/AdminMenu",
  component: AdminMenu,
  argTypes: {},
} as Meta<typeof AdminMenu>

const Template: StoryFn<typeof AdminMenu> = (args) => (
  <AdminMenu {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockAdminMenuProps.base,
} as AdminMenuProps
