import "../src/app/globals.css"
import "./preview.css"
import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"
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
    <div className={"font-sans h-full w-full"}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter"
      />
      <Story />
    </div>
  ),
]
export default preview
