"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getTrips } from "@/server/trips";
import React from "react";
import { getTripTableColumns } from "./trip-table-columns";

type TripTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getTrips>>]>;
};

export function TripTable(props: TripTableProps) {
  const [{ data }] = React.use(props.promises);

  const columns = React.useMemo(() => getTripTableColumns(), []);

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

export function TripTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getTripTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
