import { getPassengers } from "@/server/passengers";

export default async function Page() {
  const passengers = await getPassengers();
  return <div>Passengers</div>;
}
