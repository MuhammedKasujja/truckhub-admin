import { Button } from "@/components/ui/button";
import { Tonnage } from "@/types/tonnage";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon } from "lucide-react";

export function getTonnageColumns(): ColumnDef<Tonnage>[] {
  return [
    {
      accessorKey: "id",
      header: "Tonnage",
      cell: ({ row }) => {
        return <p>{row.original.tonnage}</p>;
      },
    },
    {
      accessorKey: "tonnage_min",
      header: "Min",
      cell: ({ row }) => {
        return <p>{row.original.tonnage_min}</p>;
      },
    },
    {
      accessorKey: "tonnage_max",
      header: "Max",
      cell: ({ row }) => {
        return <p>{row.original.tonnage_max}</p>;
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
