import { Meta, StoryFn } from "@storybook/react"
import SearchableSelectInput, {
  SearchableSelectInputProps,
} from "./SearchableSelectInput"
import { mockSearchableSelectInputProps } from "./SearchableSelectInput.mocks"

export default {
  title: "Inputs/SearchableSelectInput",
  component: SearchableSelectInput,
  argTypes: {},
} as Meta<typeof SearchableSelectInput>

const Template: StoryFn<typeof SearchableSelectInput> = (args) => (
  <SearchableSelectInput {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockSearchableSelectInputProps.base,
} as SearchableSelectInputProps
