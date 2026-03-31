import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Payment } from "@/features/payments/types";
import { formatDate, formatPrice } from "@/lib/format";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2Icon } from "lucide-react";
import { PaymentViewModal } from "./payment-view-modal";

export function getPaymentTableColumns(): ColumnDef<Payment>[] {
  return [
    {
      accessorKey: "number",
      header: "Number",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.number}</Button>;
      },
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
        return <p>{row.original.status}</p>;
      },
    },
    {
      accessorKey: "payment_mode",
      header: "Mode",
      cell: ({ row }) => {
        return <p>{row.original.payment_mode}</p>;
      },
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
            <PaymentViewModal payment={row.original}/>
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
    },
  ];
}