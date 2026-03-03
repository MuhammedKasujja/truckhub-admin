export type Vehicle = {
  id: number;
  plate_number: string;
  color: string;
  interior_color: string;
  cylinders: number;
  tank_capacity: number;
  engine_type: "petrol" | "desel";
  gearbox: "manual" | "automatic";
  year: string;
  seats: number;
  vehicle_type_id: number;
  car_model_id: number;
  drive_train_id: number;
  tonnage_id: number;
  created_at: Date;
  updated_at: Date;
};