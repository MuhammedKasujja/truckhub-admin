import { getUsers } from "@/features/users/service";
import { UserTable, UserTableSkeleton } from "./_components/user-table";
import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { UserSearchParamsCache } from "@/features/users/schemas";

export default async function UsersPage(props: PageProps<"/users">) {
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
