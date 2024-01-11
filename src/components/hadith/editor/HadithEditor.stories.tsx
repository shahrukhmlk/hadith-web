import { Meta, StoryFn } from "@storybook/react"
import HadithEditor, { IHadithEditor } from "./HadithEditor"
import { mockHadithEditorProps } from "./HadithEditor.mocks"

export default {
  title: "Hadith/HadithEditor",
  component: HadithEditor,
  argTypes: {},
} as Meta<typeof HadithEditor>

const Template: StoryFn<typeof HadithEditor> = (args) => (
  <HadithEditor {...args} />
)

export const Base = Template.bind({})

Base.args = {
  ...mockHadithEditorProps.base,
} as IHadithEditor
