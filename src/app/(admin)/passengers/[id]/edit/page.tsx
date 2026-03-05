import { getPassengerById } from "@/server/passengers";
import { PassengerForm } from "../../_components/passenger-form";

export default async function Page(props: PageProps<"/passengers/[id]/edit">) {
  const { data } = await getPassengerById((await props.params).id);
  return <PassengerForm initialData={data} />;
}
