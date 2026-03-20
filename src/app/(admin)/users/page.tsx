import { getUsers } from "@/features/users/service";
import { UserTable, UserTableSkeleton } from "@/features/users/components/user-table";
import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { UserSearchParamsCache } from "@/features/users/schemas";
import { requirePermission } from "@/lib/auth";

export default async function UsersPage(props: PageProps<"/users">) {
  await requirePermission("users:view");
  
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    UserSearchParamsCache,
  );

  const promises = Promise.all([getUsers(searchParams)]);
  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <UserTable promises={promises} />
    </Suspense>
  );
}
