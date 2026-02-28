"use client";

import * as React from "react";

// import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { GlobalKeys, useTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  DatabaseSearch,
  Settings2,
  Users,
  MonitorCog,
  LayoutDashboard,
  BusFront,
  ShieldUser,
  ChartLine,
} from "lucide-react";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "routes.dashboard" as const,
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "routes.trips" as const,
      url: "/admin/trips",
      icon: DatabaseSearch,
    },
    {
      title: "routes.services" as const,
      url: "/admin/services",
      icon: MonitorCog,
    },
    {
      title: "routes.passengers" as const,
      url: "/admin/passengers",
      icon: Users,
    },
    {
      title: "routes.drivers" as const,
      url: "/admin/drivers",
      icon: ShieldUser,
    },
    {
      title: "routes.vehicles" as const,
      url: "/admin/vehicles",
      icon: BusFront,
    },
    {
      title: "routes.reports" as const,
      url: "/admin/reports",
      icon: ChartLine,
    },
    {
      title: "routes.settings" as const,
      url: "/admin/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export function NavMain({
  items,
}: {
  items: {
    title: GlobalKeys;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();
  const tr = useTranslation();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url as Route}>
                <SidebarMenuButton
                  tooltip={tr(item.title)}
                  className={cn(
                    pathname.includes(item.url) &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear",
                  )}
                >
                  {item.icon && <item.icon />}
                  <span>{tr(item.title)}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
