"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { COUNTRIES } from "@/lib/countries";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators/checkout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";

export function CheckoutForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "FR",
    },
  });

  async function onSubmit(data: CheckoutInput) {
    setServerError(null);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = (await res.json()) as {
      orderId?: string;
      maishapaySubmitUrl?: string | null;
      message?: string;
      error?: string;
    };

    if (!res.ok) {
      setServerError(json.error ?? "Une erreur est survenue.");
      return;
    }

    if (json.maishapaySubmitUrl) {
      window.location.assign(json.maishapaySubmitUrl);
      return;
    }

    if (json.orderId && json.message) {
      setServerError(json.message);
      return;
    }

    if (json.orderId) {
      router.push(`/checkout/success?orderId=${encodeURIComponent(json.orderId)}`);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="fullName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Input label="Nom complet" autoComplete="name" {...field} error={fieldState.error?.message} />
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Input
            label="E-mail"
            type="email"
            autoComplete="email"
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Input label="Téléphone" type="tel" autoComplete="tel" {...field} error={fieldState.error?.message} />
        )}
      />

      <Controller
        name="country"
        control={form.control}
        render={({ field, fieldState }) => (
          <SelectField label="Pays" {...field} error={fieldState.error?.message}>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </SelectField>
        )}
      />

      {serverError ? (
        <Alert tone="error" title="Impossible de continuer">
          {serverError}
        </Alert>
      ) : null}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Traitement…" : `Payer ${formatMoney(PRODUCT.amountCents, PRODUCT.currency)}`}
      </Button>

      <p className="text-center text-xs leading-relaxed text-ink/45">
        Après validation, redirection vers <strong>MaishaPay</strong> (paiement sécurisé). La commande est créée avant
        encaissement ; la confirmation arrive après retour sur le site.
      </p>
    </form>
  );
}
