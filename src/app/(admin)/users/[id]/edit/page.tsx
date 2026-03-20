import { getUserById } from "@/features/users/service";
import { UserForm } from "@/features/users/components/user-form";
import { requirePermission } from "@/lib/auth";

export default async function Page(props: PageProps<"/users/[id]/edit">) {
  await requirePermission("users:edit");
  
  const { data } = await getUserById((await props.params).id);
  return <UserForm initialData={data} />;
}
