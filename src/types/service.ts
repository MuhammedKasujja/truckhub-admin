export type Service = {
  name: string;
  display_name: string;
  seats: number;
  base_fare: number;
  min_fare: number;
  price_per_min: number;
  price_per_unit_distance: number;
  booking_fee: number;
  tax_fee: number;
  distance_unit: "km" | "miles";
  vehicle_type_id: number;
  description: string | null;
  id: number;
  is_truck: boolean;
  created_at: Date;
  updated_at: Date;
};