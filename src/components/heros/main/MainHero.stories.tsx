import { Meta, StoryFn } from "@storybook/react"
import MainHero, { IMainHero } from "./MainHero"
import { mockMainHeroProps } from "./MainHero.mocks"

export default {
  title: "Heros/MainHero",
  component: MainHero,
  argTypes: {},
} as Meta<typeof MainHero>

const Template: StoryFn<typeof MainHero> = (args) => <MainHero {...args} />

export const Base = Template.bind({})

Base.args = {
  ...mockMainHeroProps.base,
} as IMainHero
