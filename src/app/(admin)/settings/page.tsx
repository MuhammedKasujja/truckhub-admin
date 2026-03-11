import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <Tabs defaultValue="car_make" className="w-full">
      <TabsList>
        <TabsTrigger value="car_make">Car Make</TabsTrigger>
        <TabsTrigger value="car_models">Car Models</TabsTrigger>
        <TabsTrigger value="drive_train">Drive Trains</TabsTrigger>
        <TabsTrigger value="vehicles">Vehicle Types</TabsTrigger>
        <TabsTrigger value="tonnages">Tonnages</TabsTrigger>
      </TabsList>
      <TabsContent value="car_make">
       Car makes......
      </TabsContent>
      <TabsContent value="car_models">Car models..... here</TabsContent>
      <TabsContent value="drive_train">Drive train..... here</TabsContent>
      <TabsContent value="vehicles">Vehicle types..... here</TabsContent>
      <TabsContent value="tonnages">Truck tonnages..... here</TabsContent>
    </Tabs>
  );
}
