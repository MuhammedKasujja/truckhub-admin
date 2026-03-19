import { User } from "@/features/auth/types";
import { UserModulePermissions } from "./users_permissions";
import { BookingModulePermissions } from "./booking_permissions";
import { ServiceModulePermissions } from "./services_permissions";

/**
 * Derived system permissions based on the `StoreDatabasePermissions`
 */
export const KeyNamedPermissions = {
  ...UserModulePermissions,
  ...BookingModulePermissions,
  ...ServiceModulePermissions,
} as const;

export type Permissions = keyof typeof KeyNamedPermissions;

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

export function checkUserPermission(user: User) {
  return (permission: Permissions) => {
    if (user.is_admin) return true;

    const required = KeyNamedPermissions[permission];
    if (!required) return false;

    // return required.every((p) => session.permissions.includes(p));

    // All required permissions must be present in user's list
    // using set for 0(1) lookups
    const userPermSet = new Set(user?.permissions ?? []);

    return required.every((p) => userPermSet.has(p));
  };
}
