import { AdminStats } from "@/components/admin/AdminStats";
import { OrdersDataTable } from "@/components/admin/OrdersDataTable";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tableau de bord",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { delivery: true },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink">Vue d’ensemble</h1>
          <p className="mt-1 text-sm text-ink/60">Suivi des commandes et des paiements.</p>
        </div>
        <a
          href="/api/admin/export"
          className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-porcelain hover:bg-ink/90"
        >
          Exporter CSV
        </a>
      </div>
      <AdminStats />
      <OrdersDataTable orders={orders} />
    </div>
  );
}
