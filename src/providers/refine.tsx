"use client"

import { useNotificationProvider } from "@refinedev/antd"
import { Refine } from "@refinedev/core"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"
import routerProvider from "@refinedev/nextjs-router/app"
import dataProvider from "@refinedev/simple-rest"

export default function RefineProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RefineKbarProvider>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "hadiths",
            list: "/admin/hadiths",
            create: "/admin/hadiths/create",
            edit: "/admin/hadiths/:id/edit",
            show: "/admin/hadiths/:id",
            meta: {
              canDelete: true,
            },
          },
        ]}
        options={{
          syncWithLocation: true,
        }}
        notificationProvider={useNotificationProvider}
      >
        {children}
        <RefineKbar />
      </Refine>
    </RefineKbarProvider>
  )
}
