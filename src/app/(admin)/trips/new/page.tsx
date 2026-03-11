import { getServicesByQuery } from "@/features/services/service";
import { TripRequestForm } from "../components/trip-request-form";
import { getPassengersByQuery } from "@/features/clients/service";

export default function CreateTripPage() {
  const promises = Promise.all([getServicesByQuery({}), getPassengersByQuery({})]);
  return <TripRequestForm promises={promises} />;
}
