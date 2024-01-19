"use client"

import { ThemedLayoutV2 } from "@refinedev/antd"

export default async function CrudLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemedLayoutV2>{children}</ThemedLayoutV2>
}
