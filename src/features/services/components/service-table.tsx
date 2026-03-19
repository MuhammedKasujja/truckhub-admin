"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getServices } from "@/features/services/service";
import { getServiceTableColumns } from "./service-table-columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useFetchEror } from "@/hooks/use-fetch-error";
import { HasPermission } from "@/components/has-permission";

type ServiceTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getServices>>]>;
};

export function ServiceTable(props: ServiceTableProps) {
  const [{ data, error }] = React.use(props.promises);
  const columns = React.useMemo(() => getServiceTableColumns(), []);

  useFetchEror(error);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "category", desc: true }],
      //   columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.category.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <HasPermission permission={"services:create"}>
          <Button asChild>
            <Link href={"/services/new"}>
              <PlusIcon />
              New Service
            </Link>
          </Button>
        </HasPermission>
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
