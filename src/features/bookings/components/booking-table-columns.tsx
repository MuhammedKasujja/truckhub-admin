"use client";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatPrice } from "@/lib/format";
import { Booking } from "@/features/bookings/types";
import { ColumnDef } from "@tanstack/react-table";
import { Status } from "@/components/ui/status";
import Link from "next/link";
import { HasPermission } from "@/components/has-permission";
import { EditIcon, EyeIcon } from "lucide-react";
import { EditPaymentModal } from "@/features/payments/components/edit-payment-modal";

export function getBookingTableColumns(): ColumnDef<Booking>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return (
          <Button variant={"link"} asChild>
            <Link href={`/bookings/${row.original.id}/view`}>
              {row.original.id}
            </Link>
          </Button>
        );
      },
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <Button variant={"link"} asChild>
            <Link href={`/customers/${row.original.customer.id}/view`}>
              {row.original.customer.fullname}
            </Link>
          </Button>
        );
      },
    },
    {
      id: "services",
      header: "Services",
      cell: ({ row }) => {
        return <p className="text-center">{row.original.services.length}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <Status>{row.original.status}</Status>;
      },
    },
    {
      accessorKey: "pickup_time",
      header: "Pickup Date",
      cell: ({ row }) => {
        return <p>{formatDateTime(row.original.pickup_time)}</p>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        return <p>{formatPrice(row.original.amount)}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const booking = row.original;
        return (
          <div className="flex gap-2">
            {booking.status !== "completed" && (
              <HasPermission permission={"bookings:view"}>
                <Button variant={"outline"} size={"icon"} asChild>
                  <Link href={`/bookings/${booking.id}/view`}>
                    <EyeIcon />
                  </Link>
                </Button>
              </HasPermission>
            )}
            <HasPermission permission={"bookings:edit"}>
              <Button variant={"outline"} size={"icon"} asChild>
                <Link href={`/bookings/${booking.id}/edit`}>
                  <EditIcon />
                </Link>
              </Button>
            </HasPermission>
            <HasPermission permission={"payments:create"}>
              <EditPaymentModal
                initialData={{
                  entity_id: booking.id,
                  type: "booking",
                  amount: booking.balance,
                }}
              />
            </HasPermission>
          </div>
        );
      },
    },
  ];
}
