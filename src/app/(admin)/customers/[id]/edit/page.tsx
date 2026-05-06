import { getCustomerById } from "@/features/customers/service";
import { CustomerForm } from "@/features/customers/components/customer-form";
import { requirePermission } from "@/lib/auth";

export default async function Page(props: PageProps<"/customers/[id]/edit">) {
  await requirePermission("clients:edit");
  
  const { data } = await getCustomerById((await props.params).id);
  return <CustomerForm initialData={data} />;
}
