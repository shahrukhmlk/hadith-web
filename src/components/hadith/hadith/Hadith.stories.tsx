import { Meta, StoryFn } from "@storybook/react"
import { mockHadithProps } from "./Hadith.mocks"
import HadithUI, { Hadith, IHadith } from "./HadithUI"

export default {
  title: "Hadith/Hadith",
  component: HadithUI,
  argTypes: {},
} as Meta<typeof HadithUI>

const Template: StoryFn<typeof HadithUI> = (args) => <HadithUI {...args} />

export const Base = Template.bind({})

Base.args = {
  ...mockHadithProps.base,
} as IHadith
