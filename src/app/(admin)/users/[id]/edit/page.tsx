import { getUserById } from "@/server/users";
import { UserForm } from "../../_components/user-form";

export default async function Page(props: PageProps<"/users/[id]/edit">) {
  const { data } = await getUserById((await props.params).id);
  return <UserForm initialData={data} />;
}
