import { DriverForm } from "@/features/drivers/components/driver-form";
import { requirePermission } from "@/lib/auth";

export default async function CreateDriverPage() {
  await requirePermission("drivers:create");

  return <DriverForm />;
}
