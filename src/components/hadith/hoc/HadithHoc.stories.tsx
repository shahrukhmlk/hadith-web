import { Meta, StoryFn } from "@storybook/react"
import HadithHoc, { IHadithHoc } from "./HadithHoc"
import { mockHadithHocProps } from "./HadithHoc.mocks"

export default {
  title: "Hadith/HadithHoc",
  component: HadithHoc,
  argTypes: {},
} as Meta<typeof HadithHoc>

const Template: StoryFn<typeof HadithHoc> = (args) => (
  <HadithHoc {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithHocProps.base,
} as IHadithHoc
