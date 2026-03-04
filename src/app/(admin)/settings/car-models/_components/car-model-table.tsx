"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getCarModelColumns } from "./car-model-table-columns";
import { getCarModels } from "@/server/car-models";

type CarModelTableProps = {
  carModelListPromise: Promise<Awaited<ReturnType<typeof getCarModels>>>;
};

export function CarModelTable(props: CarModelTableProps) {
  const { data } = React.use(props.carModelListPromise);
  const columns = React.useMemo(() => getCarModelColumns(), []);

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

export function CarModelTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getCarModelColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}