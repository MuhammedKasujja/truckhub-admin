import { PaymentEntityList, PaymentModeList, PaymentStatuses } from "@/config/constants";

export type PaymentMode = (typeof PaymentModeList)[number];

export type PaymentStatus = (typeof PaymentStatuses)[number];

export type PaymentType = (typeof PaymentEntityList)[number];

export type Payment = {
  id: number;
  amount: number;
  number: string;
  payment_mode: PaymentMode;
  applied: number;
  refunded: number;
  entity_id: number;
  entity_type: PaymentType;
  status: PaymentStatus;
  date: Date;
  transaction_ref: string | null;
};
