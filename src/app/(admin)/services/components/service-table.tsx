"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getServices } from "@/server/services";
import { getServiceTableColumns } from "./service-table-columns";

type ServiceTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getServices>>]>;
};

export function ServiceTable(props: ServiceTableProps) {
  const [{ data }] = React.use(props.promises);
  const columns = React.useMemo(() => getServiceTableColumns(), []);

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

export function ServiceTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getServiceTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
