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

export type PaymentMode = (typeof PaymentModeList)[number];

export type PaymentStatus = (typeof PaymentStatuses)[number];

export type Payment = {
  id: number;
  amount: number;
  number: string;
  payment_mode: PaymentMode;
  applied: number;
  refunded: number;
  booking_id: number;
  status: PaymentStatus;
  date: Date;
  transaction_ref: string | null;
};
