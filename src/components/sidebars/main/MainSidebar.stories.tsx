import { Meta, StoryFn } from "@storybook/react"
import MainSidebar, { MainSidebarProps } from "./MainSidebar"
import { mockMainSidebarProps } from "./MainSidebar.mocks"

export default {
  title: "Sidebars/MainSidebar",
  component: MainSidebar,
  argTypes: {},
} as Meta<typeof MainSidebar>

const Template: StoryFn<typeof MainSidebar> = (args) => (
  <MainSidebar {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockMainSidebarProps.base,
} as MainSidebarProps
