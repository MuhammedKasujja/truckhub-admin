import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { hasPermission } from "@/lib/permissions";
import { UserPermission } from "@/features/auth/permissions";

export async function requirePermission(permission: UserPermission) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const func = hasPermission(user);
  if (!func(permission)) {
    redirect("/unauthorized");
  }
}
