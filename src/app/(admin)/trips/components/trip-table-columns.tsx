"use client"
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { Trip } from "@/features/trips/types";
import { ColumnDef } from "@tanstack/react-table";

export function getTripTableColumns(): ColumnDef<Trip>[] {
  return [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.id}</Button>;
      },
    },
    {
      accessorKey: "pickup_location",
      header: "Origin",
      cell: ({ row }) => {
        return <p>{row.original.pickup_location}</p>;
      },
    },
    {
      accessorKey: "dropoff_location",
      header: "Destination",
      cell: ({ row }) => {
        return <p>{row.original.dropoff_location}</p>;
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => {
        return <p>{formatDateTime(row.original.created_at)}</p>;
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
