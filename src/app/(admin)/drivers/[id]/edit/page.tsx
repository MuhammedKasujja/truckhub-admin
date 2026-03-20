import { DriverForm } from "@/features/drivers/components/driver-form";
import { getDriverById } from "@/features/drivers/service";
import { requirePermission } from "@/lib/auth";

export default async function Page(props: PageProps<"/drivers/[id]/edit">) {
  await requirePermission("drivers:edit");
  
  const { data } = await getDriverById((await props.params).id);
  return <DriverForm initialData={data} />;
}
