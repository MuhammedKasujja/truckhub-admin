"use client";
import { tabs } from "slidytabs";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

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

type ConfigRoute = (typeof vehicleConfigSections)

export default function VehicleConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  console.log("Settings path", pathname)

  const activeTab = pathname ?? vehicleConfigSections[0].route;
  return (
    <Tabs
      ref={tabs()}
      value={activeTab}
      className="w-full"
      onValueChange={(val) => router.push(val)}
    >
      <TabsList>
        {vehicleConfigSections.map((section) => (
          <TabsTrigger key={section.name} value={section.route}>
            {section.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4">{children}</div>
    </Tabs>
  );
}
