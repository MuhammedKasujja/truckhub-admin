import { fetchPermissions } from "@/server/permissions";

export default async function PermissionsPage() {
  const permissions = await fetchPermissions();
  return (
    <pre className="bg-sidebar rounded-md p-4 overflow-x-auto">
      <code>{JSON.stringify(permissions, null, 2)}</code>
    </pre>
  );
}
