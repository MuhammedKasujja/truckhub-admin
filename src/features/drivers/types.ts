import { EntityId } from "@/types";

export type Driver = {
  id: EntityId;
  fullname: string;
  first_name: string
  last_name: string
  user_name: string | undefined;
  phone: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};