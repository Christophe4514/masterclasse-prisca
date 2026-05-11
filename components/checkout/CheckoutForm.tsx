"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { COUNTRIES } from "@/lib/countries";
import { PRODUCT } from "@/lib/constants";
import { formatMoney } from "@/lib/format";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators/checkout";

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
    const json = (await res.json()) as { orderId?: string; error?: string };

    if (!res.ok) {
      setServerError(json.error ?? "Une erreur est survenue.");
      return;
    }

    if (json.orderId) {
      router.push(`/checkout/success?orderId=${encodeURIComponent(json.orderId)}`);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80" htmlFor="fullName">
          Nom complet
        </label>
        <input
          id="fullName"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none ring-gold/25 focus:ring-2"
          {...form.register("fullName")}
        />
        {form.formState.errors.fullName ? (
          <p className="mt-1 text-sm text-red-700">{form.formState.errors.fullName.message}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none ring-gold/25 focus:ring-2"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="mt-1 text-sm text-red-700">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80" htmlFor="phone">
          Téléphone
        </label>
        <input
          id="phone"
          type="tel"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none ring-gold/25 focus:ring-2"
          {...form.register("phone")}
        />
        {form.formState.errors.phone ? (
          <p className="mt-1 text-sm text-red-700">{form.formState.errors.phone.message}</p>
        ) : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80" htmlFor="country">
          Pays
        </label>
        <select
          id="country"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none ring-gold/25 focus:ring-2"
          {...form.register("country")}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        {form.formState.errors.country ? (
          <p className="mt-1 text-sm text-red-700">{form.formState.errors.country.message}</p>
        ) : null}
      </div>

      {serverError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-porcelain transition hover:bg-ink/90 disabled:opacity-60"
      >
        {form.formState.isSubmitting ? "Traitement…" : `Payer ${formatMoney(PRODUCT.amountCents, PRODUCT.currency)}`}
      </button>

      <p className="text-center text-xs text-ink/50">
        Paiement sécurisé à brancher (Stripe, Lemon Squeezy…). La commande est créée côté serveur avant encaissement.
      </p>
    </form>
  );
}
