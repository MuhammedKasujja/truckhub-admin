import { DriverForm } from "../../_components/driver-form";
import { getDriverById } from "@/features/drivers/service";

export default async function Page(props: PageProps<"/drivers/[id]/edit">) {
  const { data } = await getDriverById((await props.params).id);
  return <DriverForm initialData={data} />;
}
