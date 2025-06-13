"use client";

import { RequireAuth } from "@/components/RequireAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
