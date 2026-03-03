import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { Vehicle } from "@/types/vehicle";
import { ColumnDef } from "@tanstack/react-table";

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
        return <Button variant={"outline"}>View</Button>;
      },
    },
  ];
}
