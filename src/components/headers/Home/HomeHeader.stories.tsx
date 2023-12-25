import { Meta, StoryFn } from "@storybook/react"
import HomeHeader, { IHomeHeader } from "./HomeHeader"
import { mockHomeHeaderProps } from "./HomeHeader.mocks"

export default {
  title: "Headers/HomeHeader",
  component: HomeHeader,
  argTypes: {},
} as Meta<typeof HomeHeader>

const Template: StoryFn<typeof HomeHeader> = (args) => <HomeHeader {...args} />

export const Base = Template.bind({})

Base.args = {
  ...mockHomeHeaderProps.base,
} as IHomeHeader
