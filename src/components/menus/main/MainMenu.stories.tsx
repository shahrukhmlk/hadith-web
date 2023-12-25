import { Meta, StoryFn } from "@storybook/react"
import MainMenu, { IMainMenu } from "./MainMenu"
import { mockMainMenuProps } from "./MainMenu.mocks"

export default {
  title: "Menus/MainMenu",
  component: MainMenu,
  argTypes: {},
} as Meta<typeof MainMenu>

const Template: StoryFn<typeof MainMenu> = (args) => <MainMenu {...args} />

export const Base = Template.bind({})

Base.args = {
  ...mockMainMenuProps.base,
} as IMainMenu
