import { getReviews } from "@/server/reviews";
import { Suspense } from "react";
import { ReviewTable, ReviewTableSkeleton } from "./components/review-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { ReviewSearchParamsCache } from "@/schemas/review";

export default async function Page(props: PageProps<"/reviews">) {
  const searchParams = await generatePageSearchParams(
    props.searchParams,
    ReviewSearchParamsCache,
  );

  const promises = Promise.all([getReviews(searchParams)]);
  return (
    <Suspense fallback={<ReviewTableSkeleton />}>
      <ReviewTable promises={promises} />
    </Suspense>
  );
}
