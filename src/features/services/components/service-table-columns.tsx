import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { deleteServiceById } from "@/features/services/service";
import { ServiceGroup } from "@/features/services/types";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, EditIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function getServiceTableColumns(): ColumnDef<ServiceGroup>[] {
  return [
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.category}</Button>;
      },
    },
    {
      accessorKey: "services",
      header: "Services",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {row.original.services.map((service) => (
              <Button asChild variant={"outline"}>
              <Link href={`/services/${service.id}/edit`} >{service.name}</Link>
              </Button>
            ))}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "booking_fee",
    //   header: "Booking Fee",
    //   cell: ({ row }) => {
    //     return <p>{row.original.}</p>;
    //   },
    // },
    {
      accessorKey: "is_truck",
      header: "Vehicle",
      cell: ({ row }) => {
        return <p>{row.original.is_truck ? "Truck" : "Normal"}</p>;
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
              {/* <Link href={`/services/${row.original.id}/edit`}> */}
              <EditIcon />
              {/* </Link> */}
            </Button>
            <ActionButton
              variant={"destructive"}
              size={"icon"}
              requireAreYouSure
              action={async () => {
                // const { isSuccess, error, message } = await deleteServiceById(
                //   row.original.id,
                // );
                // if (isSuccess) {
                //   toast.success(message);
                //   return { error: false };
                // } else {
                return { error: true, message: "" };
                // }
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
