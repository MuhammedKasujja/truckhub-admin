"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { getPosts, Post } from "@/server/actions";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type PostsTableProps = {
  promises: Promise<[Awaited<ReturnType<typeof getPosts>>]>;
};

export function PostsTable(props: PostsTableProps) {
  const [data] = React.use(props.promises);

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

const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <Button variant={"link"}>{row.original.title}</Button>;
    },
  },
  {
    accessorKey: "body",
    header: "Body",
    cell: ({ row }) => {
      return <p>{row.original.body}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Button variant={"outline"}>View</Button>;
    },
  },
];
