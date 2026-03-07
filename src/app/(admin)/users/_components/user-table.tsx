"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getUsers } from "@/server/users";
import React from "react";
import { getUserTableColumns } from "./user-table-columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

type UserTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getUsers>>]>;
};

export function UserTable(props: UserTableProps) {
  const [{ data, error, pagination }] = React.use(props.promises);

  const columns = React.useMemo(() => getUserTableColumns(), []);

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
          <Link href={"/users/new"}>
            <PlusIcon />
            Add User
          </Link>
        </Button>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}

export function UserTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getUserTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
