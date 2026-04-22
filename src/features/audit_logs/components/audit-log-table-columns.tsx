import { ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "@/features/audit_logs/types";
import { TFunction } from "@/i18n";
import { formatDate } from "@/lib/format";
import { ActionButton } from "@/components/ui/action-button";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function getAuditLogTableColumns(tr: TFunction): ColumnDef<AuditLog>[] {
  return [
    {
      accessorKey: "user_id",
      header: "ID",
      cell: ({ row }) => {
        return <Button variant={"link"}>{row.original.user_id}</Button>;
      },
      size: 100,
      meta: {
        label: tr("payments.number"),
      },
    },
    {
      accessorKey: "resource_type",
      header: tr("payments.amount"),
      cell: ({ row }) => {
        return <div className="flex gap-2">{row.original.resource_type}</div>;
      },
      meta: {
        label: tr("payments.amount"),
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return <div className="flex gap-2">{row.original.action}</div>;
      },
    },
    {
      accessorKey: "source",
      header: "Source",
      cell: ({ row }) => {
        return <div className="flex gap-2">{row.original.source}</div>;
      },
    },
    {
      accessorKey: "created_at",
      header: tr("payments.date"),
      cell: ({ row }) => {
        return <p>{formatDate(row.original.created_at)}</p>;
      },
      meta: {
        label: tr("payments.date"),
        variant: "dateRange",
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <ActionButton
              variant={"destructive"}
              size={"icon"}
              requireAreYouSure
              action={async () => {
                return { error: true, message: "Not implemented yet...." };
              }}
            >
              <Trash2Icon />
            </ActionButton>
          </div>
        );
      },
      size: 100,
    },
  ];
}
