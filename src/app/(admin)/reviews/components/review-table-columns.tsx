import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { Review } from "@/features/reviews/types";
import { ColumnDef } from "@tanstack/react-table";

export function getReviewTableColumns(): ColumnDef<Review>[] {
  return [
    {
      accessorKey: "passenger_id",
      header: "Passenger",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.passenger_id}</Button>;
      },
    },
    {
      id: "driver_id",
      header: "Driver",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.driver_id}</Button>;
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        return <p>{row.original.rating}</p>;
      },
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => {
        return <p>{row.original.comment}</p>;
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
