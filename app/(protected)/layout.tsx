import type * as React from "react";

import { requireSession } from "@/lib/auth-session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();

  return <>{children}</>;
}
