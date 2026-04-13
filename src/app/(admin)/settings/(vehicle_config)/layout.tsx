"use client";
import { tabs } from "slidytabs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const vehicleConfigSections = [
  {
    name: "Car Makes",
    route: "/settings/car-brands",
  },
  {
    name: "Car Models",
    route: "/settings/car-models",
  },
  {
    name: "Drive Trains",
    route: "/settings/drive-trains",
  },
  {
    name: "Vehicle Types",
    route: "/settings/vehicle-types",
  },
  {
    name: "Tonnages",
    route: "/settings/tonnages",
  },
] as const;

export default function VehicleConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Tabs
      ref={tabs()}
      defaultValue={pathname}
      className="w-full"
    >
      <TabsList>
        {vehicleConfigSections.map((section) => (
          <TabsTrigger key={section.name} value={section.route} asChild>
            <Link href={section.route}>{section.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {vehicleConfigSections.map((section) => (
        <TabsContent key={section.name} value={section.route}>
          {children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
