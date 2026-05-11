"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { computeAdminSessionToken, COOKIE_NAME } from "@/lib/admin-session";

export async function loginAdminAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;

  if (!adminPassword || !secret) {
    return { error: "Administration non configurée (variables d’environnement)." };
  }

  if (password !== adminPassword) {
    return { error: "Mot de passe incorrect." };
  }

  const token = await computeAdminSessionToken(secret);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logoutAdminAction() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
  redirect("/admin/login");
}
