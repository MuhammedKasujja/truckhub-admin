import { PermissionsWrapper } from "@/features/settings/permissions/components/permissions-wrapper";
import { fetchPermissions, getRoles } from "@/features/settings/permissions/service";

export default async function PermissionsPage() {
  const permissions = await fetchPermissions();

  const promises = Promise.all([getRoles()]);

  return (
    <div className="space-y-5">
      <PermissionsWrapper promises={promises} />
    </div>
  );
}
