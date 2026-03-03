import { getUsers } from "@/server/users";
import { UserTable } from "./components/user-table";

export default async function UsersPage() {
  const promises = Promise.all([getUsers()]);
  return <UserTable promises={promises} />;
}
