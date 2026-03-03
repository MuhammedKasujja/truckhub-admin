"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { getServices } from "@/server/services";
import { Service } from "@/types/service";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type ServiceTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getServices>>]>;
};

export function ServiceTable(props: ServiceTableProps) {
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

const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <Button variant={"link"}>{row.original.name}</Button>;
    },
  },
  {
    accessorKey: "base_fare",
    header: "Fee",
    cell: ({ row }) => {
      return <p>{row.original.base_fare}</p>;
    },
  },
  {
    accessorKey: "booking_fee",
    header: "Booking Fee",
    cell: ({ row }) => {
      return <p>{row.original.booking_fee}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Button variant={"outline"}>View</Button>;
    },
  },
];


export function ServiceTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={columns.length}
      filterCount={1}
      shrinkZero
    />
  );
}