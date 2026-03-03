"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { formatDateTime } from "@/lib/format";
import { getPassengers } from "@/server/passengers";
import { Passenger } from "@/types/passenger";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type PassengerTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getPassengers>>]>;
};

export function PassengerTable(props: PassengerTableProps) {
  const [{ data }] = React.use(props.promises);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "id", desc: true }],
      //   columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}

const columns: ColumnDef<Passenger>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <Button variant={"link"}>{row.original.fullname}</Button>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <p>{row.original.email}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <p>{row.original.phone}</p>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return <p>{formatDateTime(row.original.created_at)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Button variant={"outline"}>View</Button>;
    },
  },
];

export function PassengerTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={columns.length}
      filterCount={1}
      shrinkZero
    />
  );
}
