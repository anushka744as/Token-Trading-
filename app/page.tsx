"use client";

import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { TokenProvider } from "@/contexts/TokenContext";
import HomePage from "@/pages/HomePage";

export default function Page() {
  return (
    <ErrorBoundary>
      <TokenProvider>
        <Toaster position="top-right" richColors />
        <HomePage />
      </TokenProvider>
    </ErrorBoundary>
  );
}
