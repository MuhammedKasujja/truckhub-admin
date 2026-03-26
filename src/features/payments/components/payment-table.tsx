"use client";

import React from "react";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { getPayments } from "@/features/payments/service";
import { getPaymentTableColumns } from "./payment-table-columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useFetchEror } from "@/hooks/use-fetch-error";
import { HasPermission } from "@/components/has-permission";

type PaymentTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getPayments>>]>;
};

export function PaymentTable(props: PaymentTableProps) {
  const [{ data, error, pagination }] = React.use(props.promises);
  const columns = React.useMemo(() => getPaymentTableColumns(), []);

  useFetchEror(error);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: pagination.totalPages,
    initialState: {
      sorting: [{ id: 'date', desc: true }],
      //   columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id.toString(),
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
              New Payment
            </Link>
          </Button>
        </HasPermission>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}

export function PaymentTableSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={getPaymentTableColumns().length}
      filterCount={1}
      shrinkZero
    />
  );
}
