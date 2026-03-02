import { getDrivers } from "@/server/drivers";

export default async function Page() {
  const drivers = await getDrivers();
  console.log(drivers);
  return <div>Drivers</div>;
}
