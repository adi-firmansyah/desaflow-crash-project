"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signIn } from "@/lib/auth-client";
import { signInSchema, type SignInInput } from "@/lib/validations/auth";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInInput) {
    setFormError(null);

    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setFormError(error.message ?? "Email atau password salah");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="mx-auto mt-20 max-w-sm space-y-4 rounded-lg border p-6">
      <h1 className="text-xl font-semibold">Masuk</h1>

      {formError && (
        <p className="rounded bg-red-100 p-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full rounded border px-3 py-2"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </main>
  );
}
