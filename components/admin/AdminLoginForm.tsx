"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/actions/admin-auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdminAction, {});

  return (
    <form action={formAction} className="mx-auto flex max-w-sm flex-col gap-5">
      <Input
        label="Mot de passe administrateur"
        id="password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
      />
      {state?.error ? (
        <Alert tone="error" title="Connexion refusée">
          {state.error}
        </Alert>
      ) : null}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>
        {pending ? "Connexion…" : "Accéder au tableau de bord"}
      </Button>
    </form>
  );
}
