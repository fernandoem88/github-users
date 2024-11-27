"use client";

import type { PropsWithChildren } from "react";
import { AppQueryProvider } from "../QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return <AppQueryProvider>{children}</AppQueryProvider>;
}
