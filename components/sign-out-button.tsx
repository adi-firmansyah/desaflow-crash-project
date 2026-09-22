"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });

    setIsPending(false);
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="rounded bg-red-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
    >
      {isPending ? "Keluar..." : "Sign Out"}
    </button>
  );
}
