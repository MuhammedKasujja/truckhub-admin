export type BookingServiceItem = {
  service_id: number;
  service_name: string;
  cost_per_item: number;
  total_items: number;
  discount: number;
};

export type Booking = {
  id: number;
  created_at: Date;
  request_start_time: Date;
  pickup_time: Date;
  return_time: Date;
  status: BookingStatus;
  partial: number | null;
  balance: number;
  discount: number;
  amount: number;
  services: BookingServiceItem[];
  customer: {
    id: number;
    fullname: string;
    phone: string;
    email: string;
  };
};

export type BookingDetails = {
  id: number;
  created_at: Date;
  pickup_time: Date;
  return_time: Date;
  status: BookingStatus;
  partial: number | null;
  balance: number;
  discount: number;
  amount: number;
  services: BookingServiceItem[];
  customer: {
    id: number;
    fullname: string;
    phone: string;
    email: string;
  };
};

export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";

export interface LocationPoint {
  lat: number;
  lng: number;
}

export interface Location extends LocationPoint {
  name: string;
}
