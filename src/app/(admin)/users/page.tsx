import { getUsers } from "@/server/users";
import { UserTable, UserTableSkeleton } from "./components/user-table";
import { Suspense } from "react";
import { generatePageSearchParams } from "@/lib/search-params";
import { UserSearchParamsCache } from "@/schemas/user";

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
