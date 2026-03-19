// +++++++++++++++++++++++++++
// bookings permissions
export const BookingModulePermissions = {
  "bookings:create": ["bookings:create"],
  "bookings:view": ["bookings:view_single", "bookings:view_list"],
  "bookings:delete": ["bookings:delete"],
  "bookings:edit": ["bookings:update", "bookings:view_single"],
} as const;

export type BookingPermissions = keyof typeof BookingModulePermissions;

// export type BookingPermissions = `bookings@${BookingPermissionsType}`;
