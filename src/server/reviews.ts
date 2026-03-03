"use server";

import { Review } from "@/types/review";
import apiClient from "@/lib/api-client";

export async function getReviews() {
  const { data, isSuccess } = await apiClient.get<Review[]>("/v1/reviews");
  return { data: isSuccess ? data! : [] };
}

export async function getReviewById(reviewId: number | string) {
  return await apiClient.get<Review>(`/v1/reviews/${reviewId}`);
}

export async function deleteReviewById(reviewId: number | string) {
  return await apiClient.delete(`/v1/reviews/${reviewId}`);
}

export async function updateReview(reviewId: number | string) {
  return await apiClient.put(`/v1/reviews/${reviewId}`);
}

export async function createReview(data: unknown) {
  return await apiClient.post("/v1/reviews", data);
}
