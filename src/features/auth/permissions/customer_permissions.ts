// +++++++++++++++++++++++++++
// customer permissions
export const CustomerModulePermissions = {
  "customers:create": ["customers:create"],
  "customers:view": ["customers:view_single", "customers:view_list"],
  "customers:delete": ["customers:delete"],
  "customers:edit": ["customers:update", "customers:view_single"],
} as const;

export type BookingPermissions = keyof typeof CustomerModulePermissions;

// export type CustomerPermissions = `customers@${CustomerPermissionsType}`;
