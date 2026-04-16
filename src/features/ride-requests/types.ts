export type Passenger = {
  id: number;
  fullname: string;
  phone: string;
  email: string;
};

export type RideRequest = {
  id: number;
  origin: string;
  destination: string;
  created_at: Date;
  request_start_time: Date;
  status: RideStatus;
  partial: number | null;
  balance: number;
  discount: number;
  amount: number;
  customer: Passenger;
};

export type RideRequestDetails = {
  id: number;
  origin: Location;
  destination: Location;
  created_at: Date;
  polyline_route: string | undefined;
  request_start_time: Date;
  status: RideStatus;
  partial: number | undefined;
  balance: number;
  discount: number;
  distance: number;
  duration: number;
  amount: number;
  is_paid: number;
  customer: Passenger;
};

export const RideStatusList = [
  "pending",
  "matched",
  "accepted",
  "rejected",
  "cancelled",
  "completed",
] as const;

export type RideStatus = (typeof RideStatusList)[number];

export interface LocationPoint {
  lat: number;
  lng: number;
}

export interface Location extends LocationPoint {
  name: string;
}
