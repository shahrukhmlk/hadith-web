import { Meta, StoryFn } from "@storybook/react"
import HadithImageGenerator, { HadithImageGeneratorProps } from "./HadithImageGenerator"
import { mockHadithImageGeneratorProps } from "./HadithImageGenerator.mocks"

export default {
  title: "Hadith/HadithImageGenerator",
  component: HadithImageGenerator,
  argTypes: {},
} as Meta<typeof HadithImageGenerator>

const Template: StoryFn<typeof HadithImageGenerator> = (args) => (
  <HadithImageGenerator {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithImageGeneratorProps.base,
} as HadithImageGeneratorProps
