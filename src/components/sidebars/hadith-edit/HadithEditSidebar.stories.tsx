import { Meta, StoryFn } from "@storybook/react"
import HadithEditSidebar, { HadithEditSidebarProps } from "./HadithEditSidebar"
import { mockHadithEditSidebarProps } from "./HadithEditSidebar.mocks"

export default {
  title: "Sidebars/HadithEditSidebar",
  component: HadithEditSidebar,
  argTypes: {},
} as Meta<typeof HadithEditSidebar>

const Template: StoryFn<typeof HadithEditSidebar> = (args) => (
  <HadithEditSidebar {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithEditSidebarProps.base,
} as HadithEditSidebarProps
