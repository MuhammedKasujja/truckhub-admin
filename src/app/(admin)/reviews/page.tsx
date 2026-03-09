import { getReviews } from "@/features/reviews/service";
import { Suspense } from "react";
import { ReviewTable, ReviewTableSkeleton } from "./components/review-table";
import { generatePageSearchParams } from "@/lib/search-params";
import { ReviewSearchParamsCache } from "@/features/reviews/schemas";

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
