'use client'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import React from 'react'

const queryClient = new QueryClient()

const QueryProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider