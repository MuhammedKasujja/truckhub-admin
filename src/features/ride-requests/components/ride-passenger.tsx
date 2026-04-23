import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Passenger } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HasPermission } from "@/components/has-permission";

interface RidePassengerProps {
  passenger: Passenger;
}

export function RidePassenger({ passenger }: RidePassengerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger</CardTitle>
        <CardAction>
          <HasPermission permission="customers:view">
            <Button variant={"secondary"} asChild>
              <Link href={`/customers/${passenger.id}/view`}>View</Link>
            </Button>
          </HasPermission>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{passenger.fullname}</p>
        <p>{passenger.phone}</p>
        <p>{passenger.email}</p>
      </CardContent>
    </Card>
  );
}
