import { CustomerForm } from "@/features/clients/components/customer-form";
import { requirePermission } from "@/lib/auth";

export default async function CreateCustomerPage() {
  await requirePermission("clients:create");
  return <CustomerForm />;
}
