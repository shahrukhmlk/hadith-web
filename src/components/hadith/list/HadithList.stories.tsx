import { Meta, StoryFn } from "@storybook/react"
import HadithList, { HadithListProps } from "./HadithList"
import { mockHadithListProps } from "./HadithList.mocks"

export default {
  title: "Hadith/HadithList",
  component: HadithList,
  argTypes: {},
} as Meta<typeof HadithList>

const Template: StoryFn<typeof HadithList> = (args) => (
  <HadithList {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithListProps.base,
} as HadithListProps
