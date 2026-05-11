import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, isValidAdminSession } from "@/lib/admin-session";

/**
 * GET /api/admin/export
 * Export CSV des commandes — protégé par session admin (cookie).
 */
export async function GET() {
  const secret = process.env.ADMIN_SECRET;
  const jar = await cookies();
  const ok = await isValidAdminSession(jar.get(COOKIE_NAME)?.value, secret);
  if (!ok) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { delivery: true },
  });

  const headers = [
    "id",
    "fullName",
    "email",
    "phone",
    "country",
    "amount",
    "currency",
    "paymentStatus",
    "paymentReference",
    "createdAt",
    "deliveryStatus",
    "downloadLink",
    "deliveredAt",
  ];

  const escape = (v: string | number | null | undefined) => {
    const s = v == null ? "" : String(v);
    if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
    return s;
  };

  const lines = [headers.join(",")];
  for (const o of orders) {
    lines.push(
      [
        escape(o.id),
        escape(o.fullName),
        escape(o.email),
        escape(o.phone),
        escape(o.country),
        escape(o.amount),
        escape(o.currency),
        escape(o.paymentStatus),
        escape(o.paymentReference),
        escape(o.createdAt.toISOString()),
        escape(o.delivery?.deliveryStatus),
        escape(o.delivery?.downloadLink),
        escape(o.delivery?.deliveredAt?.toISOString() ?? ""),
      ].join(","),
    );
  }

  const csv = lines.join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="commandes-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
