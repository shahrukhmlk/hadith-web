import { Meta, StoryFn } from "@storybook/react"
import HadithEditUi, { IHadithEditUI } from "./HadithEditUI"
import { mockHadithEditUiProps } from "./HadithEditUI.mocks"

export default {
  title: "Hadith/HadithEditUi",
  component: HadithEditUi,
  argTypes: {},
} as Meta<typeof HadithEditUi>

const Template: StoryFn<typeof HadithEditUi> = (args) => (
  <HadithEditUi {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithEditUiProps.base,
} as IHadithEditUI
