"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { formatDateTime } from "@/lib/format";
import { getReviews } from "@/server/reviews";
import { Review } from "@/types/review";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type ReviewTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getReviews>>]>;
};

export function ReviewTable(props: ReviewTableProps) {
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

const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "passenger_id",
    header: "Passenger",
    cell: ({ row }) => {
      return <Button variant={"link"}>{row.original.passenger_id}</Button>;
    },
  },
  {
    id: "driver_id",
    header: "Driver",
    cell: ({ row }) => {
      return <Button variant={"link"}>{row.original.driver_id}</Button>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      return <p>{row.original.rating}</p>;
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      return <p>{row.original.comment}</p>;
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

export function ReviewTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={columns.length}
      filterCount={1}
      shrinkZero
    />
  );
}
