import { getServicesByQuery } from "@/features/services/service";
import { BookingRequestForm } from "@/features/bookings/components/booking-request-form";
import { getPassengersByQuery } from "@/features/clients/service";

export default function CreateTripPage() {
  const promises = Promise.all([getServicesByQuery({}), getPassengersByQuery({})]);
  return <BookingRequestForm promises={promises} />;
}
