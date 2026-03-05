export type Driver = {
  id: number;
  fullname: string;
  first_name: string
  last_name: string
  user_name: string | undefined;
  phone: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};