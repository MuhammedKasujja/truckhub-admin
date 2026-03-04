import { Button } from "@/components/ui/button";
import { CarBrand } from "@/types/car-brand";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";

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
        return (
          <div className="flex gap-2">
            <Button variant={"outline"} size={"icon"}>
              <EyeIcon />
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <EditIcon />
            </Button>
          </div>
        );
      },
    },
  ];
}
