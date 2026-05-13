import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { PRODUCT } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";

export async function AdminStats() {
  const [total, paid, revenueAgg] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { paymentStatus: "PAID" } }),
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { amount: true },
    }),
  ]);

  const revenue = revenueAgg._sum.amount ?? 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="border-ink/10 bg-white/95">
        <CardContent className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Commandes</p>
          <p className="mt-3 font-serif text-3xl tracking-tight text-ink">{total}</p>
        </CardContent>
      </Card>
      <Card className="border-ink/10 bg-white/95">
        <CardContent className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Paiements confirmés</p>
          <p className="mt-3 font-serif text-3xl tracking-tight text-ink">{paid}</p>
        </CardContent>
      </Card>
      <Card className="border-ink/10 bg-gradient-to-br from-white to-cream/40">
        <CardContent className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">Chiffre (payé)</p>
          <p className="mt-3 font-serif text-3xl tracking-tight text-ink">
            {formatMoney(revenue, PRODUCT.currency)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
