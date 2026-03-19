"use client";

import { KeyNamedPermissions, Permissions } from "@/features/auth/permissions";
import { User } from "@/features/auth/types";
import { createContext, useContext, useState, type ReactNode } from "react";

const AuthContext = createContext<{
  user: User;
  hasPermission: (perm: Permissions) => boolean;
} | null>(null);

export function AuthProvider({
  value,
  children,
}: {
  value: User;
  children: ReactNode;
}) {
  // TODO: Refresh user and token logic

  const [user] = useState(value); // can later add refresh logic if needed

  const hasPermission = (permission: Permissions) => {
    if (user.is_admin) return true;

    let required: readonly string[] = [];

    if (typeof permission === "string") {
      required = [permission];
    } else {
      // assuming KeyNamedPermissions is imported or available
      required = KeyNamedPermissions[permission] ?? [];
    }

    // return required.every((p) => session.permissions.includes(p));

    // All required permissions must be present in user's list
    const userPermSet = new Set(user?.permissions ?? []);

    return required.every((p) => userPermSet.has(p));
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
