"use client"

import { Toaster } from "@/components/ui/sonner"
import { API_ROUTES } from "@/constants/routes"
import { Provider as ZenStackHooksProvider } from "@/lib/hooks/query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "next-themes"
import { useState } from "react"

/***
 * This components wraps all Root Level providers which should use "use client" into a single component.
 */

export default function RootProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <ZenStackHooksProvider value={{ endpoint: API_ROUTES.TRPC }}>
          {children}
        </ZenStackHooksProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}
