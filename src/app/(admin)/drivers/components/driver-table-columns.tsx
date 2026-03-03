import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { Driver } from "@/types/driver";
import { ColumnDef } from "@tanstack/react-table";

export function getDriverTableColumns(): ColumnDef<Driver>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.fullname}</Button>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return <p>{row.original.email}</p>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        return <p>{row.original.phone}</p>;
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
