import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { deleteVehicleById } from "@/features/vehicles/service";
import { Vehicle } from "@/features/vehicles/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function getVehicleTableColumns(): ColumnDef<Vehicle>[] {
  return [
    {
      accessorKey: "plate_number",
      header: "License",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.plate_number}</Button>;
      },
    },
    {
      id: "engine_type",
      header: "Engine",
      cell: ({ row }) => {
        return (
          <p>
            {row.original.engine_type}/ {row.original.gearbox}
          </p>
        );
      },
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => {
        return (
          <p>
            {row.original.color}/ {row.original.interior_color}
          </p>
        );
      },
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => {
        return <p>{row.original.year}</p>;
      },
    },
    {
      id: "driver",
      header: "Driver",
      cell: ({ row }) => {
        return <p>-</p>;
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
        return (
          <div className="flex gap-2">
            <Button variant={"outline"} size={"icon"}>
              <Link href={`/vehicles/${row.original.id}/view`}>
                <EyeIcon />
              </Link>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link href={`/vehicles/${row.original.id}/edit`}>
                <EditIcon />
              </Link>
            </Button>
            <ActionButton
              variant={"destructive"}
              size={"icon"}
              requireAreYouSure
              action={async () => {
                const { isSuccess, error, message } = await deleteVehicleById(
                  row.original.id,
                );
                if (isSuccess) {
                  toast.success(message);
                  return { error: false };
                } else {
                  return { error: true, message: error?.message };
                }
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
