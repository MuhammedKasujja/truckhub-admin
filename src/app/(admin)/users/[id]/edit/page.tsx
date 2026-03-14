import { getUserById } from "@/features/users/service";
import { UserForm } from "@/features/users/components/user-form";

export default async function Page(props: PageProps<"/users/[id]/edit">) {
  const { data } = await getUserById((await props.params).id);
  return <UserForm initialData={data} />;
}
