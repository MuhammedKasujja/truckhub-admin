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

export type BookingDetails = {
  id: number;
  origin: Location;
  destination: Location;
  created_at: Date;
  polyline_route: string | undefined
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

export interface LocationPoint {
  lat: number;
  lng: number;
};

export interface Location extends  LocationPoint{
  name: string;
};
