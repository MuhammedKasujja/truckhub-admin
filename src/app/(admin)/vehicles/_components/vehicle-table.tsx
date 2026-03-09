"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getVehicles } from "@/features/vehicles/service";
import React from "react";
import { getVehicleTableColumns } from "./vehicle-table-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

type VehicleTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getVehicles>>]>;
};

export function VehicleTable(props: VehicleTableProps) {
  const [{ data, error, pagination }] = React.use(props.promises);
  const columns = React.useMemo(() => getVehicleTableColumns(), []);

  React.useEffect(() => {
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
          <Link href={"/vehicles/new"}>
            <PlusIcon />
            New Vehicle
          </Link>
        </Button>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}

export function VehicleTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getVehicleTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
