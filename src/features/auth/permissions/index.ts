// +++++++++++++++++++++++++++

// sytem users
const createUser = [
  "users:create",
  "bookings:view",
  "customers:view",
  "cast_members:view",
] as const;

const viewUsers = ["users:view", "users:details"] as const;

const deleteUsers = ["users:delete"] as const;

const UserModulePermissions = {
  "create:users": createUser,
  "view:users": viewUsers,
  "delete:users": deleteUsers,
} as const;

export type UserPermissionsType = keyof typeof UserModulePermissions;

export type UserPermissions = `users@${UserPermissionsType}`;

// +++++++++++++++++++++++++++
// bookings
const viewBooking = ["bookings:view", "bookings:details"] as const;

const deleteBooking = ["bookings:delete"] as const;

const createBooking = ["bookings:create"] as const;

const editBooking = ["bookings:edit"] as const;

const BookingModulePermissions = {
  "create:bookings": createBooking,
  "view:bookings": viewBooking,
  "delete:bookings": deleteBooking,
  "edit:bookings": editBooking,
} as const;

export type BookingPermissionsType = keyof typeof BookingModulePermissions;

export type BookingPermissions = `bookings@${BookingPermissionsType}`;

//

export type Permissions = UserPermissions | BookingPermissions;

export function useHasPermission() {
  const { user } = useAuth();
  return (permission: Permissions) => {
    return Boolean(user?.is_admin || user?.permissions.includes(permission));
  };
}

function useAuth() {
  const user: AuthUser = {
    is_admin: false,
    permissions: [],
  };
  return { user };
}

type AuthUser = {
  is_admin: boolean;
  permissions: string[];
};

export function hasBookingPermission(
  permission: BookingPermissionsType,
): boolean {
  const hasPermission = useHasPermission();
  return hasPermission(`bookings@${permission}`);
}

export function hasUserPermission(permission: UserPermissionsType): boolean {
  const hasPermission = useHasPermission();
  return hasPermission(`users@${permission}`);
}

// TODO: how to get the logged in user from cache without making the function async 

// OPTIONS
// -- Using context api
// -- Using zustand
// -- Using react - cache
// -- Move auth user to localStorage **** Try to avoid as possible
