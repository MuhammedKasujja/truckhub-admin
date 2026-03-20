import { UserForm } from "@/features/users/components/user-form";
import { requirePermission } from "@/lib/auth";

export default async function CreateUserPage() {
  await requirePermission("users:create");

  return <UserForm />;
}
