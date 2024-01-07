import { Meta, StoryFn } from "@storybook/react"
import BaseTemplate, { BaseTemplateProps } from "./BaseTemplate"
import { mockBaseTemplateProps } from "./BaseTemplate.mocks"

export default {
  title: "__parent__/BaseTemplate",
  component: BaseTemplate,
  argTypes: {},
} as Meta<typeof BaseTemplate>

const Template: StoryFn<typeof BaseTemplate> = (args) => (
  <BaseTemplate {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockBaseTemplateProps.base,
} as BaseTemplateProps
