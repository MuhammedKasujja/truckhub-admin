import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Payment } from "@/features/payments/types";
import { formatDate, formatPrice } from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { PaymentViewModal } from "./payment-view-modal";
import { PaymentStatuses, PaymentModeList } from "@/config/constants";
import { Badge } from "@/components/ui/badge";

export function getPaymentTableColumns(): ColumnDef<Payment>[] {
  return [
    {
      accessorKey: "number",
      header: "Number",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.number}</Button>;
      },
      size: 100,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">{formatPrice(row.original.amount)}</div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="capitalize">
            {row.original.status}
          </Badge>
        );
      },
      meta: {
        label: "Status",
        variant: "multiSelect",
        options: PaymentStatuses.map((status) => ({
          label: `${status}`,
          value: `${status}`,
        })),
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "payment_mode",
      header: "Method",
      cell: ({ row }) => {
        return <Badge variant="outline">{row.original.payment_mode}</Badge>;
      },
      meta: {
        label: "Method",
        variant: "select",
        options: PaymentModeList.map((method) => ({
          label: `${method}`,
          value: `${method}`,
        })),
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return <p>{formatDate(row.original.date)}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <PaymentViewModal payment={row.original} />
            <ActionButton
              variant={"destructive"}
              size={"icon"}
              requireAreYouSure
              action={async () => {
                return { error: true, message: "Not implemented yet...." };
              }}
            >
              <Trash2Icon />
            </ActionButton>
          </div>
        );
      },
      size: 100,
    },
  ];
}
