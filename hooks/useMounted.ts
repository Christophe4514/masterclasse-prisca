"use client";

import { useEffect, useState } from "react";

/** Évite les mismatches d’hydratation pour tout contenu client-only. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
