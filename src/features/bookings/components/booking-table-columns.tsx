"use client";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { Booking } from "@/features/bookings/types";
import { ColumnDef } from "@tanstack/react-table";
import { Status } from "@/components/ui/status";
import Link from "next/link";

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
      accessorKey: "origin",
      header: "Origin",
      cell: ({ row }) => {
        return <p>{row.original.origin}</p>;
      },
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => {
        return <p>{row.original.destination}</p>;
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <Status>{row.original.status}</Status>;
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        return <p>{formatDateTime(row.original.request_start_time)}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return <Button variant={"outline"}>View</Button>;
      },
    },
  ];
}
