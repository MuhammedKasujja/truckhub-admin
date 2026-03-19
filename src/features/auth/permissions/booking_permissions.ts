// +++++++++++++++++++++++++++
// bookings permissions
export const BookingModulePermissions = {
  "bookings:create": ["bookings:create", "passengers:view_list", "services:view_list"],
  "bookings:view": ["bookings:view_single", "bookings:view_list"],
  "bookings:delete": ["bookings:delete"],
  "bookings:edit": ["bookings:update", "bookings:view_single"],
} as const;

export type BookingPermissions = keyof typeof BookingModulePermissions;

// export type BookingPermissions = `bookings@${BookingPermissionsType}`;
