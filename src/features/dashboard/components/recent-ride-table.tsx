import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatDate, formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RideRequest } from "@/features/ride-requests/types";

type RecentRideTableProps = {
  rides: RideRequest[];
};

export function RecentRideTable({ rides }: RecentRideTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rides</CardTitle>
        <CardAction>
          <Button type="button" asChild>
            <Link href={"/rides"}>
              View
              <ArrowUpRight />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border bg-background">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-25">Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rides.length ? (
                rides.map((ride) => (
                  <TableRow key={`${ride.id.toString()}*${ride.status}`}>
                    <TableCell className="font-medium">{ride.id}</TableCell>
                    <TableCell className="font-medium">
                      {ride.customer.fullname}
                    </TableCell>
                    <TableCell>{ride.status}</TableCell>
                    <TableCell>{formatPrice(ride.amount)}</TableCell>
                    <TableCell>{formatPrice(ride.balance)}</TableCell>
                    <TableCell>{formatDate(ride.created_at)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Empty className="">
                      <EmptyHeader>
                        <EmptyMedia variant="icon"></EmptyMedia>
                        <EmptyTitle>No Rides Found</EmptyTitle>
                      </EmptyHeader>
                      <EmptyContent></EmptyContent>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
