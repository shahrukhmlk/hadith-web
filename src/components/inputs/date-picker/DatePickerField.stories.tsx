import { Meta, StoryFn } from "@storybook/react"
import DatePickerField, { DatePickerFieldProps } from "./DatePickerField"
import { mockDatePickerFieldProps } from "./DatePickerField.mocks"

export default {
  title: "Inputs/DatePickerField",
  component: DatePickerField,
  argTypes: {},
} as Meta<typeof DatePickerField>

const Template: StoryFn<typeof DatePickerField> = (args) => (
  <DatePickerField {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockDatePickerFieldProps.base,
} as DatePickerFieldProps
