import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";

const ONE_MINUTE = 60 * 1_000;
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 60 * ONE_MINUTE } },
});

export function AppQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
