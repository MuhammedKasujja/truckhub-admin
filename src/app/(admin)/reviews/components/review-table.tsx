"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getReviews } from "@/features/reviews/service";
import { getReviewTableColumns } from "./review-table-columns";
import { toast } from "sonner";
import { useFetchEror } from "@/hooks/use-fetch-error";

type ReviewTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getReviews>>]>;
};

export function ReviewTable(props: ReviewTableProps) {
  const [{ data, error, pagination }] = React.use(props.promises);
  const columns = React.useMemo(() => getReviewTableColumns(), []);

  useFetchEror(error);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pagination.totalPages,
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

export function ReviewTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getReviewTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
