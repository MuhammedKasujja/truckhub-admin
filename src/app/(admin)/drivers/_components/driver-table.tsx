"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getDrivers } from "@/features/drivers/types";
import React, { useEffect, useMemo } from "react";
import { getDriverTableColumns } from "./driver-table-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

type DriverTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getDrivers>>]>;
};

export function DriverTable(props: DriverTableProps) {
  const [{ data, error, pagination }] = React.use(props.promises);
  const columns = useMemo(() => getDriverTableColumns(), []);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

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
        <Button asChild>
          <Link href={"/drivers/new"}>
            <PlusIcon />
            New Driver
          </Link>
        </Button>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}

export function DriverTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getDriverTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
