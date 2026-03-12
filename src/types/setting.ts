import { EntityId } from "@/types";

export type Setting = {
  key: string;
  value: unknown;
};

export type VehicleConfigurations = {
  vehicle_types: [
    {
      name: string;
      is_truck: boolean;
      id: EntityId;
    },
  ];
  car_brands: [
    {
      name: string;
      id: EntityId;
    },
  ];
  car_models: [
    {
      name: string;
      id: EntityId;
      car_brand_id: EntityId;
    },
  ];
  truck_tonnages: [
    {
      id: EntityId;
      tonnage: string;
      tonnage_min: number;
      tonnage_max: number;
    },
  ];
  vehicle_capacities: [
    {
      name: string;
      capacity: number;
      vehicle_type_id: number;
      id: EntityId;
    },
  ];
  drive_trains: [
    {
      name: string;
      is_truck: boolean;
      id: EntityId;
    },
  ];
};
