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

export type UserPermission = keyof typeof KeyNamedPermissions;

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
