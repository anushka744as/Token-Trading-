"use client";

import type { ReactNode } from "react";
import "./globals.css";

// ⬅️ Import your provider here
import { TokenProvider } from "@/contexts/TokenContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TokenProvider>
          {children}
        </TokenProvider>
      </body>
    </html>
  );
}
