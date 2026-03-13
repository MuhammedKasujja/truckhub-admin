export type Booking = {
  id: number;
  origin: string;
  destination: string;
  created_at: Date;
  request_start_time: Date;
  status: BookingStatus;
  customer: {
    id: number;
    fullname: string;
    phone: string;
    email: string;
  };
};

export type BookingStatus =
  | "pending"
  | "matched"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";
