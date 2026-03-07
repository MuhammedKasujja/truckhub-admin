"use server";

import { Review } from "@/types/review";
import apiClient from "@/lib/api-client";
import {
  ReviewCreateSchemaType,
  ReviewListSearchParams,
  ReviewUpdateSchemaType,
} from "@/schemas/review";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getReviews(input: ReviewListSearchParams) {
  const params = generateApiSearchParams(input);

  const { data, isSuccess, error } = await apiClient.get<Review[]>(
    `/v1/reviews/?${params}`,
  );
  return { data: isSuccess ? data! : [], error };
}

export async function getReviewById(reviewId: number | string) {
  return await apiClient.get<Review>(`/v1/reviews/${reviewId}`);
}

export async function deleteReviewById(reviewId: number | string) {
  return await apiClient.delete(`/v1/reviews/${reviewId}`);
}

export async function updateReview(data: ReviewUpdateSchemaType) {
  const { id: reviewId, ...rest } = data;
  return await apiClient.put(`/v1/reviews/${reviewId}`, rest);
}

export async function createReview(data: ReviewCreateSchemaType) {
  return await apiClient.post("/v1/reviews", data);
}
