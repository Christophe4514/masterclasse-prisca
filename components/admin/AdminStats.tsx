import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/format";
import { PRODUCT } from "@/lib/constants";

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
      <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">Commandes</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{total}</p>
      </div>
      <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">Paiements confirmés</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{paid}</p>
      </div>
      <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">Chiffre (payé)</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">
          {formatMoney(revenue, PRODUCT.currency)}
        </p>
      </div>
    </div>
  );
}
