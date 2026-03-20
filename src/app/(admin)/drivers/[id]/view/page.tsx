import { DriverDetails } from "@/features/drivers/components/driver-details";
import { getDriverDetailsById } from "@/features/drivers/service";
import { requirePermission } from "@/lib/auth";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/drivers/[id]/view">) {
  await requirePermission("drivers:edit");
  
  const promises = Promise.all([getDriverDetailsById((await props.params).id)]);

  return (
    <Suspense fallback={<div>Loading driver details...</div>}>
      <DriverDetails promises={promises} />
    </Suspense>
  );
}
