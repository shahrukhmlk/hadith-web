import { Meta, StoryFn } from "@storybook/react"
import HadithEditForm, { IHadithEditForm } from "./HadithEditForm"
import { mockHadithEditFormProps } from "./HadithEditForm.mocks"

export default {
  title: "Hadith/HadithEditForm",
  component: HadithEditForm,
  argTypes: {},
} as Meta<typeof HadithEditForm>

const Template: StoryFn<typeof HadithEditForm> = (args) => (
  <HadithEditForm {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithEditFormProps.base,
} as IHadithEditForm
