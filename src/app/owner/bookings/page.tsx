import type { Metadata } from "next";
import { OwnerBookings } from "@/components/OwnerBookings";

export const metadata: Metadata = {
  title: "Owner Bookings",
  robots: { index: false, follow: false },
};

export default function OwnerBookingsPage() {
  return <OwnerBookings />;
}
