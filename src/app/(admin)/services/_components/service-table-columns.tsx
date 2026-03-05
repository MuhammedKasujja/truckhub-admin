import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { deleteServiceById } from "@/server/services";
import { Service } from "@/types/service";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, EditIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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
        return (
          <div className="flex gap-2">
            <Button variant={"outline"} size={"icon"}>
              <EyeIcon />
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link href={`/services/${row.original.id}/edit`}>
                <EditIcon />
              </Link>
            </Button>
            <ActionButton
              variant={"destructive"}
              size={"icon"}
              requireAreYouSure
              action={async () => {
                const { isSuccess, error, message } = await deleteServiceById(
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
