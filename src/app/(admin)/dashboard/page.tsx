import { getPosts } from "@/server/actions";
import { PostsTable } from "./components/posts-table";
import { fetchPermissions } from "@/server/permissions";

export default async function Page(props: PageProps<"/dashboard">) {
  const promises = Promise.all([getPosts()]);
  await fetchPermissions();
  return (
    // <div className="flex flex-col gap-2">
      <PostsTable promises={promises} />
    // </div>
  );
}
