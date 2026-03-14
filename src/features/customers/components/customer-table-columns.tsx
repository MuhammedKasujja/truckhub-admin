import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { deleteCustomerById } from "@/features/customers/service";
import { Customer } from "@/features/customers/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function getCustomerTableColumns(): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <Button variant={"link"} asChild>
            <Link href={`/customers/${row.original.id}/view`}>
              {row.original.fullname}
            </Link>
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return <p>{row.original.email}</p>;
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        return <p>{row.original.phone}</p>;
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
              <Link href={`/customers/${row.original.id}/view`}>
                <EyeIcon />
              </Link>
            </Button>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link href={`/customers/${row.original.id}/edit`}>
                <EditIcon />
              </Link>
            </Button>
            <ActionButton
              variant={"destructive"}
              size={"icon"}
              requireAreYouSure
              action={async () => {
                const { isSuccess, error, message } = await deleteCustomerById(
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
