"use client"

import { RefineThemes } from "@refinedev/antd"
import { App, ConfigProvider } from "antd"

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConfigProvider theme={RefineThemes.Blue}>
      <App>{children}</App>
    </ConfigProvider>
  )
}
