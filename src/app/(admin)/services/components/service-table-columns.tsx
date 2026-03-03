import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";
import { ColumnDef } from "@tanstack/react-table";

export function getServiceTableColumns(): ColumnDef<Service>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.name}</Button>;
      },
    },
    {
      accessorKey: "base_fare",
      header: "Fee",
      cell: ({ row }) => {
        return <p>{row.original.base_fare}</p>;
      },
    },
    {
      accessorKey: "booking_fee",
      header: "Booking Fee",
      cell: ({ row }) => {
        return <p>{row.original.booking_fee}</p>;
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
