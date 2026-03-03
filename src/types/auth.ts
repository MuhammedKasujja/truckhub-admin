export type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

export type AuthResponse = {
  access_token: string;
  expires_in: number;
  user: AuthUser;
  permissions: string[];
};