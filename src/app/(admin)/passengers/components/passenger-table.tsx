"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getPassengers } from "@/server/passengers";
import React from "react";
import { getPassengerTableColumns } from "./passenger-table-columns";

type PassengerTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getPassengers>>]>;
};

export function PassengerTable(props: PassengerTableProps) {
  const [{ data }] = React.use(props.promises);
  const columns = React.useMemo(() => getPassengerTableColumns(), []);

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

export function PassengerTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getPassengerTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
