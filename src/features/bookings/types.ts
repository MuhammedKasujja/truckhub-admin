export type Booking = {
  id: number;
  origin: string;
  destination: string;
  created_at: Date;
  status: BookingStatus;
};

export type BookingStatus =
  | "pending"
  | "matched"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";
