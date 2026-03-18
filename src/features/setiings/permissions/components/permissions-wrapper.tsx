"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemPermissions } from "@/features/auth/permissions";
import { getRoles } from "@/server/permissions";
import { use, useMemo, useState } from "react";

const modules = Object.keys(SystemPermissions);

type PermissionsWrapperProps = {
  promises: Promise<[Awaited<ReturnType<typeof getRoles>>]>;
};

export function PermissionsWrapper({ promises }: PermissionsWrapperProps) {
  const [{ data: roles }] = use(promises);

  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(),
  );
  const [roleId, setRoleId] = useState<string | undefined>();

  const groupedPermissions = useMemo(
    () => Object.entries(SystemPermissions),
    [],
  );

  const isAllSelected = (permissions: string[]) =>
    permissions.every((p) => selectedPermissions.has(p));

  function togglePermissions(permissions: string[]) {
    setSelectedPermissions((prev) => {
      const next = new Set(prev);

      const allSelected = permissions.every((p) => next.has(p));

      if (allSelected) {
        // remove all permissions
        permissions.forEach((p) => next.delete(p));
      } else {
        // add all permissions
        permissions.forEach((p) => next.add(p));
      }

      return next;
    });
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={setRoleId} value={roleId}>
        <SelectTrigger>
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {(roles ?? []).map((opt) => (
              <SelectItem key={opt.id} value={opt.id.toString()}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Tabs defaultValue={modules[0]} className="w-full">
        <TabsList>
          {modules.map((module) => (
            <TabsTrigger key={module} value={module}>
              {module}
            </TabsTrigger>
          ))}
        </TabsList>
        {groupedPermissions.map(([module, permissions]) => (
          <TabsContent value={module}>
            {Object.entries(permissions).map(([group, permissionList]) => (
              <Button
                type="button"
                variant={isAllSelected(permissionList) ? "default" : "ghost"}
                key={group}
                onClick={() => togglePermissions(permissionList)}
              >
                {group}
              </Button>
            ))}
          </TabsContent>
        ))}
      </Tabs>
      {selectedPermissions}
    </div>
  );
}
