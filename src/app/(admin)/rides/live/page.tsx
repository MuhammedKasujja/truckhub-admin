import { LiveRideMap } from "@/features/ride-requests/components/live-ride-map";
import { getActiveRides } from "@/features/ride-requests/service";

export default async function LiveMapPage() {
  const { data } = await getActiveRides();
  return <LiveRideMap />;
}
