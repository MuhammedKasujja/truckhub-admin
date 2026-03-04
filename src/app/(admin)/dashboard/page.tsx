import { fetchPermissions } from "@/server/permissions";

export default async function Page(props: PageProps<"/dashboard">) {
  await fetchPermissions();
  return <div className="flex flex-col gap-2">Dashboard</div>;
}
