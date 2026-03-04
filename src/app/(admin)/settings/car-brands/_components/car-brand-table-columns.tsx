import { Button } from "@/components/ui/button";
import { CarBrand } from "@/types/car-brand";
import { ColumnDef } from "@tanstack/react-table";

export function getCarBrandColumns(): ColumnDef<CarBrand>[] {
  return [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {
        return <p>{row.original.id}</p>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <p>{row.original.name}</p>;
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
