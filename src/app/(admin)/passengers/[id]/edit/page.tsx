import { getCustomerById } from "@/features/clients/service";
import { PassengerForm } from "../../_components/passenger-form";

export default async function Page(props: PageProps<"/passengers/[id]/edit">) {
  const { data } = await getCustomerById((await props.params).id);
  return <PassengerForm initialData={data} />;
}
