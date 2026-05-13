import { AdminStats } from "@/components/admin/AdminStats";
import { OrdersDataTable } from "@/components/admin/OrdersDataTable";
import { prisma } from "@/lib/prisma";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
          <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">Commandes</h1>
          <p className="mt-2 text-sm text-ink/60">Recherche, statuts paiement, export.</p>
        </div>
        <ButtonLink href="/api/admin/export" variant="secondary" size="md">
          Exporter CSV
        </ButtonLink>
      </div>

      <AdminStats />

      <Card className="border-ink/10 bg-white/95">
        <CardContent className="p-4 sm:p-6">
          <OrdersDataTable orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
}
