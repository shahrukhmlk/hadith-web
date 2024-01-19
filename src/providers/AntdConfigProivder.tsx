"use client"

import { RefineThemes } from "@refinedev/antd"
import { App, ConfigProvider, theme } from "antd"

export default function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConfigProvider theme={{ algorithm: [theme.darkAlgorithm] }}>
      <App>{children}</App>
    </ConfigProvider>
  )
}
