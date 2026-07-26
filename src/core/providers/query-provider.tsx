import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a single QueryClient instance with suitable default options for mobile
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache stale time
      gcTime: 1000 * 60 * 60 * 24, // 24 hours garbage collection time
      retry: 2,
      refetchOnWindowFocus: false, // Prevents unnecessary refetches on React Native app state focus
    },
    mutations: {
      retry: 0,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
