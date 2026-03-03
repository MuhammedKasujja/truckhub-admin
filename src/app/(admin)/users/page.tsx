import { getUsers } from "@/server/users";
import { UserTable, UserTableSkeleton } from "./components/user-table";
import { Suspense } from "react";

export default async function UsersPage() {
  const promises = Promise.all([getUsers()]);
  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <UserTable promises={promises} />
    </Suspense>
  );
}
