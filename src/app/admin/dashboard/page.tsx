import { getPosts } from "@/server/actions";
import { PostsTable } from "./components/posts-table";
import { fetchPermissions } from "@/server/permissions";

export default async function Page(props: PageProps<"/admin/dashboard">) {
  const promises = Promise.all([getPosts()]);
  const permissions = await fetchPermissions();
  console.log("permissions", permissions);
  return (
    // <div className="flex flex-col gap-2">
      <PostsTable promises={promises} />
    // </div>
  );
}
