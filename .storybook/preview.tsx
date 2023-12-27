import "../src/app/globals.css"
import "./preview.css"
import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/react"
import React from "react"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    nextjs: {
      appDirectory: true,
    },
  },
}

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (Story) => (
    <div className={"h-full w-full font-sans"}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter"
      />
      <Story />
    </div>
  ),
]
export default preview
