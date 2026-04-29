import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { requirePermission } from "@/lib/auth";
import { PageAction, PageHeader, PageTitle } from "@/components/page-header";
import { getTranslations } from "@/i18n/server";
import { AuditLogSearchParamsCache } from "@/features/audit_logs/schemas";
import { getAuditLogs } from "@/features/audit_logs/service";
import {
  AuditLogTable,
  AuditLogTableSkeleton,
} from "@/features/audit_logs/components/audit-log-table";
import { PageBackButton } from "@/components/page-header";

export default async function Page(props: PageProps<"/reports/audits">) {
  await requirePermission("config:view:audit_logs");
  const tr = await getTranslations();

  const searchParams = await generatePageSearchParams(
    props.searchParams,
    AuditLogSearchParamsCache,
  );

  const promises = Promise.all([getAuditLogs(searchParams)]);
  return (
    <Suspense fallback={<AuditLogTableSkeleton />}>
      <PageHeader>
        <PageTitle>
          <PageBackButton />
          Audit Logs</PageTitle>
        <PageAction>
          <PageBackButton />
        </PageAction>
      </PageHeader>
      <AuditLogTable promises={promises} />
    </Suspense>
  );
}
