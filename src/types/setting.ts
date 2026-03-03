export type Setting = {
  key: string;
  value: unknown;
};

export type VehicleConfigurations = {
  vehicle_types: [
    {
      name: string;
      is_truck: boolean;
      id: number;
    },
  ];
  car_brands: [
    {
      name: string;
      id: number;
    },
  ];
  car_models: [
    {
      name: string;
      id: number;
    },
  ];
  truck_tonnages: [
    {
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
      id: number;
    },
  ];
  drive_trains: [
    {
      name: string;
      is_truck: boolean;
      id: number;
    },
  ];
};