import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").max(120),
  email: z.string().email("Adresse e-mail invalide."),
  phone: z.string().min(6, "Numéro de téléphone invalide.").max(32),
  country: z.string().min(2, "Indiquez un pays.").max(80),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
