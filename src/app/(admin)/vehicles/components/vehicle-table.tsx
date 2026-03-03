"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { formatDateTime } from "@/lib/format";
import { getVehicles } from "@/server/vehicles";
import { Vehicle } from "@/types/vehicle";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type VehicleTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getVehicles>>]>;
};

export function VehicleTable(props: VehicleTableProps) {
  const [{ data }] = React.use(props.promises);

  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "id", desc: true }],
      //   columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}

const columns: ColumnDef<Vehicle>[] = [
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
