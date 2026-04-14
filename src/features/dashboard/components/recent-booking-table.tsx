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
import { Booking } from "@/features/bookings/types";

type RecentBookingTableProps = {
  bookings: Booking[];
};

export function RecentBookingTable({ bookings }: RecentBookingTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardAction>
          <Button type="button" asChild>
            <Link href={"/bookings"}>
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
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id.toString()}>
                    <TableCell className="font-medium">
                      {booking.services.length}
                    </TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>{formatPrice(booking.amount)}</TableCell>
                    <TableCell>{formatPrice(booking.balance)}</TableCell>
                    <TableCell>{formatDate(booking.created_at)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Empty className="">
                      <EmptyHeader>
                        <EmptyMedia variant="icon"></EmptyMedia>
                        <EmptyTitle>No Bookings Found</EmptyTitle>
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
