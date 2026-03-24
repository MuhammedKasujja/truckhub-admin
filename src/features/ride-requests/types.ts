export type RideRequest = {
  id: number;
  origin: string;
  destination: string;
  created_at: Date;
  request_start_time: Date;
  status: RideRequestStatus;
  partial: number | null;
  balance: number;
  discount: number;
  amount: number;
  customer: {
    id: number;
    fullname: string;
    phone: string;
    email: string;
  };
};

export type RideRequestDetails = {
  id: number;
  origin: Location;
  destination: Location;
  created_at: Date;
  polyline_route: string | undefined
  request_start_time: Date;
  status: RideRequestStatus;
  partial: number | null;
  balance: number;
  discount: number;
  amount: number;
  customer: {
    id: number;
    fullname: string;
    phone: string;
    email: string;
  };
};

export type RideRequestStatus =
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
