export type PaymentMode =
  | "cash"
  | "mobile_money"
  | "bank_transfer"
  | "paypal"
  | "credit_card";

export type PaymentStatus =
  | "pending"
  | "cancelled"
  | "refunded"
  | "failed"
  | "completed"
  | "partially_refunded";

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
