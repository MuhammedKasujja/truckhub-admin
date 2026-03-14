import { getCustomerById } from "@/features/customers/service";
import { CustomerForm } from "@/features/customers/components/customer-form";

export default async function Page(props: PageProps<"/customers/[id]/edit">) {
  const { data } = await getCustomerById((await props.params).id);
  return <CustomerForm initialData={data} />;
}
