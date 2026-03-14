import { UserDetailsWrapper } from "@/features/users/components/user-details-wrapper";
import { getUserProfileById } from "@/features/users/service";
import { Suspense } from "react";

export default async function Page(props: PageProps<"/users/[id]/view">) {
  const promises = Promise.all([getUserProfileById((await props.params).id)]);

  return (
    <Suspense fallback={<div>Loading user details...</div>}>
      <UserDetailsWrapper promises={promises} />
    </Suspense>
  );
}
