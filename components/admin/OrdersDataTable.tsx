"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { OrderWithDelivery } from "@/types";
import { formatMoney } from "@/lib/format";

type Row = OrderWithDelivery;

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ getValue }) => {
      const d = getValue() as Date;
      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(new Date(d));
    },
  },
  { accessorKey: "fullName", header: "Client" },
  { accessorKey: "email", header: "E-mail" },
  { accessorKey: "country", header: "Pays" },
  {
    accessorKey: "paymentReference",
    header: "Réf. paiement",
    cell: ({ getValue }) => {
      const v = getValue() as string | null;
      return v ? (
        <span className="font-mono text-xs text-ink/85">{v}</span>
      ) : (
        <span className="text-ink/40">—</span>
      );
    },
  },
  {
    id: "amount",
    header: "Montant",
    accessorFn: (row) => formatMoney(row.amount, row.currency),
  },
];

export function OrdersDataTable({ orders }: { orders: Row[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const data = useMemo(() => orders, [orders]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const q = String(filterValue ?? "").toLowerCase().trim();
      if (!q) return true;
      const name = row.original.fullName.toLowerCase();
      const email = row.original.email.toLowerCase();
      return name.includes(q) || email.includes(q);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink/35" />
        <input
          type="search"
          placeholder="Rechercher par nom ou e-mail…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm text-ink outline-none ring-gold/25 transition focus:ring-2"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink/8 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-ink/8 bg-sand/60 text-xs uppercase tracking-wide text-ink/55">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3 font-medium">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-ink/6">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-sand/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-ink/90">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
        <span>
          Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-ink/12 px-4 py-1.5 font-medium hover:bg-sand disabled:opacity-40"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </button>
          <button
            type="button"
            className="rounded-full border border-ink/12 px-4 py-1.5 font-medium hover:bg-sand disabled:opacity-40"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
