export type SystemUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

export type UserListResponse = {
  users: SystemUser[];
};
