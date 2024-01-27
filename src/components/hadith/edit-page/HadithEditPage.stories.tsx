import { Meta, StoryFn } from "@storybook/react"
import HadithEditPage, { HadithEditPageProps } from "./HadithEditPage"
import { mockHadithEditPageProps } from "./HadithEditPage.mocks"

export default {
  title: "Hadith/HadithEditPage",
  component: HadithEditPage,
  argTypes: {},
} as Meta<typeof HadithEditPage>

const Template: StoryFn<typeof HadithEditPage> = (args) => (
  <HadithEditPage {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithEditPageProps.base,
} as HadithEditPageProps
