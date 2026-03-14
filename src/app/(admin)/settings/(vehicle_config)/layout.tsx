import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

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
  return (
    <Tabs defaultValue={vehicleConfigSections[0].route} className="w-full">
      <TabsList>
        {vehicleConfigSections.map((section) => (
          <TabsTrigger key={section.name} value={section.route} asChild>
            <Link href={section.route}>{section.name}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="/settings/car-brands">{children}</TabsContent>
      {/* <TabsContent value="car_models">Car models..... here</TabsContent>
      <TabsContent value="drive_train">Drive train..... here</TabsContent>
      <TabsContent value="vehicles">Vehicle types..... here</TabsContent>
      <TabsContent value="tonnages">Truck tonnages..... here</TabsContent> */}
    </Tabs>
  );
}
