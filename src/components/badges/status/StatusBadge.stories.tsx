import { Meta, StoryFn } from "@storybook/react"
import StatusBadge, { StatusBadgeProps } from "./StatusBadge"
import { mockStatusBadgeProps } from "./StatusBadge.mocks"

export default {
  title: "Badges/StatusBadge",
  component: StatusBadge,
  argTypes: {},
} as Meta<typeof StatusBadge>

const Template: StoryFn<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockStatusBadgeProps.base,
} as StatusBadgeProps
