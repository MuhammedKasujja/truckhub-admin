import {
  BookingPermissions,
  BookingModulePermissions,
} from "./booking_permissions";
import {
  ServicePermissions,
  ServiceModulePermissions,
} from "./services_permissions";
import { UserPermissions, UserModulePermissions } from "./users_permissions";

/**
 * Derived system permissions based on the `StoreDatabasePermissions`
 */
export const KeyNamedPermissions = {
  ...UserModulePermissions,
  ...BookingModulePermissions,
  ...ServiceModulePermissions,
} as const;

export type Permissions = keyof typeof KeyNamedPermissions;

export function hasPermission() {
  const { user } = useAuth();
  return (permission: Permissions) => {
    if (user.is_admin) return true;

    const required = KeyNamedPermissions[permission];
    if (!required) return false;

    // All required permissions must be present in user's list
    const userPermSet = new Set(user?.permissions ?? []);

    return required.every((p) => userPermSet.has(p));
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

export function hasBookingPermission(permission: BookingPermissions): boolean {
  const func = hasPermission();
  return func(`${permission}`);
}

export function hasUserPermission(permission: UserPermissions): boolean {
  const func = hasPermission();
  return func(`${permission}`);
}

// TODO: how to get the logged in user from cache without making the function async

// OPTIONS
// -- Using context api
// -- Using zustand
// -- Using react - cache
// -- Move auth user to localStorage **** Try to avoid as possible

export const SystemPermissions = {
  users: UserModulePermissions,
  bookings: BookingModulePermissions,
  services: ServiceModulePermissions,
};

export type PermissionModule = keyof typeof SystemPermissions;

/**
 * Returns Stored database level permission names with typesafe
 */
export type StoreDatabasePermissions = {
  [K in keyof typeof SystemPermissions]: (typeof SystemPermissions)[K][keyof (typeof SystemPermissions)[K]];
}[keyof typeof SystemPermissions][number];

///

// type CanViewUsers    = Extract<UserPermissions, `${string}:view` | `${string}:details`>;
// type CanMutateUsers  = Extract<UserPermissions, `${string}:create` | `${string}:delete` | `${string}:edit`>;
