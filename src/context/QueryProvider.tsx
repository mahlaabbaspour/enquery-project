'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { ChildrenType } from '@/@core/types'

export default function ConfigUseQuery({ children }: ChildrenType) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        gcTime: 5 * 60 * 1000
      }
    }
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
