export const DEFAULT_FITER_QUERY_PER_PAGE = 10;

export const CURRENCY_CODE = "UGX"


export const PaymentModeList = [
  "cash",
  "mobile_money",
  "bank_transfer",
  "paypal",
  "credit_card",
] as const;

export const PaymentStatuses = [
  "pending",
  "cancelled",
  "refunded",
  "failed",
  "completed",
  "partially_refunded",
] as const;

export const PaymentEntityList = ["ride", "booking"] as const;