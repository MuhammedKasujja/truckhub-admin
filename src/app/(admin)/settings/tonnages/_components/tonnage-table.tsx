"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useDataTable } from "@/hooks/use-data-table";
import { getTonnages } from "@/features/setiings/tonnage/service";
import { getTonnageColumns } from "./tonnage-table-columns";

type TonnageTableProps = {
  tonnageListPromise: Promise<Awaited<ReturnType<typeof getTonnages>>>;
};

export function TonnageTable(props: TonnageTableProps) {
  const { data } = React.use(props.tonnageListPromise);
  const columns = React.useMemo(() => getTonnageColumns(), []);

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

  return <DataTable table={table} showPagination={false} />;
}

export function TonnageTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getTonnageColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
