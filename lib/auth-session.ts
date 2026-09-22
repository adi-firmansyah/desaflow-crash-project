import "server-only";

import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { cache } from "react";

import { auth, type Session } from "@/lib/auth";

export const getSession = cache(async (): Promise<Session | null> => {
  return auth.api.getSession({ headers: await headers() });
});

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) unauthorized();
  return session;
}

// export async function requireRole(role: string): Promise<Session> {
//   const session = await requireSession();
//   if (session.user.role !== role) forbidden();
//   return session;
// }
