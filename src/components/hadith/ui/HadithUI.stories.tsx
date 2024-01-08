import { Meta, StoryFn } from "@storybook/react"
import HadithUI, { HadithUIProps } from "./HadithUI"
import { mockHadithProps } from "./HadithUI.mocks"

export default {
  title: "Hadith/HadithUI",
  component: HadithUI,
  argTypes: {},
} as Meta<typeof HadithUI>

const Template: StoryFn<typeof HadithUI> = (args) => <HadithUI {...args} />

export const Base = Template.bind({})

Base.args = {
  ...mockHadithProps.base,
} as HadithUIProps
