"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/actions/admin-auth";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdminAction, {});

  return (
    <form action={formAction} className="mx-auto flex max-w-sm flex-col gap-4">
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-ink/80">
          Mot de passe administrateur
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none ring-gold/30 transition focus:ring-2"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-porcelain transition hover:bg-ink/90 disabled:opacity-60"
      >
        {pending ? "Connexion…" : "Accéder au tableau de bord"}
      </button>
    </form>
  );
}
