import { Meta, StoryFn } from "@storybook/react"
import HadithCalendar, { IHadithCalendar } from "./HadithCalendar"
import { mockHadithCalendarProps } from "./HadithCalendar.mocks"

export default {
  title: "Hadith/HadithCalendar",
  component: HadithCalendar,
  argTypes: {},
} as Meta<typeof HadithCalendar>

const Template: StoryFn<typeof HadithCalendar> = (args) => (
  <HadithCalendar {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithCalendarProps.base,
} as IHadithCalendar
