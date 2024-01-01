import { Meta, StoryFn } from "@storybook/react"
import LanguageMenu, { ILanguageMenu } from "./LanguageMenu"
import { mockLanguageMenuProps } from "./LanguageMenu.mocks"

export default {
  title: "Menus/LanguageMenu",
  component: LanguageMenu,
  argTypes: {},
} as Meta<typeof LanguageMenu>

const Template: StoryFn<typeof LanguageMenu> = (args) => (
  <LanguageMenu {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockLanguageMenuProps.base,
} as ILanguageMenu
