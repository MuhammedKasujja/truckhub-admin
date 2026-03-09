"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getPassengers } from "@/features/clients/service";
import React from "react";
import { getPassengerTableColumns } from "./passenger-table-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

type PassengerTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getPassengers>>]>;
};

export function PassengerTable(props: PassengerTableProps) {
  const [{ data, error, pagination }] = React.use(props.promises);
  const columns = React.useMemo(() => getPassengerTableColumns(), []);

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
          <Link href={"/passengers/new"}>
            <PlusIcon />
            New Passenger
          </Link>
        </Button>
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
