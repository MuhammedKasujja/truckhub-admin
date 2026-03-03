"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { formatDateTime } from "@/lib/format";
import { getTrips } from "@/server/trips";
import { Trip } from "@/types/trip";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type TripTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getTrips>>]>;
};

export function TripTable(props: TripTableProps) {
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

const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <Button variant={"link"}>{row.original.id}</Button>;
    },
  },
  {
    accessorKey: "pickup_location",
    header: "Origin",
    cell: ({ row }) => {
      return <p>{row.original.pickup_location}</p>;
    },
  },
  {
    accessorKey: "dropoff_location",
    header: "Destination",
    cell: ({ row }) => {
      return <p>{row.original.dropoff_location}</p>;
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


export function TripTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={columns.length}
      filterCount={1}
      shrinkZero
    />
  );
}