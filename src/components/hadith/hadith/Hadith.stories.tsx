import { Meta, StoryFn } from "@storybook/react"
import Hadith, { IHadith } from "./Hadith"
import { mockHadithProps } from "./Hadith.mocks"

export default {
  title: "Hadith/Hadith",
  component: Hadith,
  argTypes: {},
} as Meta<typeof Hadith>

const Template: StoryFn<typeof Hadith> = (args) => <Hadith {...args} />

export const Base = Template.bind({})

Base.args = {
  ...mockHadithProps.base,
} as IHadith
