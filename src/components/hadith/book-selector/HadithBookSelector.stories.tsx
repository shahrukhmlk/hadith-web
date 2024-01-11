import { Meta, StoryFn } from "@storybook/react"
import HadithBookSelector, { HadithBookSelectorProps } from "./HadithBookSelector"
import { mockHadithBookSelectorProps } from "./HadithBookSelector.mocks"

export default {
  title: "Hadith/HadithBookSelector",
  component: HadithBookSelector,
  argTypes: {},
} as Meta<typeof HadithBookSelector>

const Template: StoryFn<typeof HadithBookSelector> = (args) => (
  <HadithBookSelector {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithBookSelectorProps.base,
} as HadithBookSelectorProps
