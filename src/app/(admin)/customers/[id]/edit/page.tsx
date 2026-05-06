import { getCustomerById } from "@/features/clients/service";
import { CustomerForm } from "@/features/clients/components/customer-form";
import { requirePermission } from "@/lib/auth";

export default async function Page(props: PageProps<"/customers/[id]/edit">) {
  await requirePermission("clients:edit");
  
  const { data } = await getCustomerById((await props.params).id);
  return <CustomerForm initialData={data} />;
}
