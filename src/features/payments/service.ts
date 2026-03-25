"use server";

import * as apiClient from "@/lib/api-client";
import { Payment } from "@/features/payments/types";
import {
  PaymentListSearchParams,
  PaymentUpdateSchemaType,
  PaymentCreateSchemaType,
} from "./schemas";
import { SearchQuery } from "@/types";
import { generateApiSearchParams } from "@/lib/search-params";

export async function getPayments(input: PaymentListSearchParams) {
  const params = generateApiSearchParams(input);
  const { data, isSuccess, error } = await apiClient.getFn<Payment[]>(
    `/v1/payments?${params}`,
  );
  return { data: isSuccess ? data! : [], error };
}

export async function getPaymentsByQuery(query: SearchQuery) {
  const params = generateApiSearchParams(query);

  const { data, isSuccess, error } = await apiClient.getFn<Payment[]>(
    `/v1/payments?${params}`,
  );
  return { data: isSuccess ? data! : [], error };
}

export async function getPaymentById(serviceId: number | string) {
  return await apiClient.getFn<Payment>(`/v1/payments/${serviceId}`);
}

export async function deletePaymentById(serviceId: number | string) {
  return await apiClient.deleteFn(`/v1/payments/${serviceId}`);
}

export async function updatePayment(data: PaymentUpdateSchemaType) {
  const { id: serviceId, ...rest } = data;
  return await apiClient.putFn(`/v1/payments/${serviceId}`, rest);
}

export async function createPayment(data: PaymentCreateSchemaType) {
  return await apiClient.postFn("/v1/payments", data);
}
