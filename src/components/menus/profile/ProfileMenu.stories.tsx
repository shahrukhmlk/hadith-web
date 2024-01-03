import { Meta, StoryFn } from "@storybook/react"
import ProfileMenu, { IProfileMenu } from "./ProfileMenu"
import { mockProfileMenuProps } from "./ProfileMenu.mocks"

export default {
  title: "Menus/ProfileMenu",
  component: ProfileMenu,
  argTypes: {},
} as Meta<typeof ProfileMenu>

const Template: StoryFn<typeof ProfileMenu> = (args) => (
  <ProfileMenu {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockProfileMenuProps.base,
} as IProfileMenu
