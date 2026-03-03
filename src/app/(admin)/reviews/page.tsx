import { getReviews } from "@/server/reviews";
import { Suspense } from "react";
import { ReviewTable, ReviewTableSkeleton } from "./components/review-table";

export default function Page() {
  const promises = Promise.all([getReviews()]);
  return (
    <Suspense fallback={<ReviewTableSkeleton />}>
      <ReviewTable promises={promises} />
    </Suspense>
  );
}
