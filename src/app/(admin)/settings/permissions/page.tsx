import { PermissionsWrapper } from "@/features/setiings/permissions/components/permissions-wrapper";
import { fetchPermissions, getRoles } from "@/server/permissions";

export default async function PermissionsPage() {
  const permissions = await fetchPermissions();

  const promises = Promise.all([getRoles()]);

  return (
    <div className="space-y-5">
      <PermissionsWrapper promises={promises} />
    </div>
  );
}
