// sytem users

export const UserModulePermissions = {
  "users:create": ["users:create"],
  "users:view": ["users:index", "users:details"],
  "users:delete": ["users:delete"],
  "users:edit": ["users:update"],
} as const;

export type UserPermissions = keyof typeof UserModulePermissions;

// export type UserPermissions = `users@${UserPermissionsType}`;
