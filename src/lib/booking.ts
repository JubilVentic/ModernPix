export const bookingOccasions = [
  "Wedding",
  "Birthday",
  "Corporate event",
  "Graduation",
  "Baptism",
  "Anniversary",
  "Holiday celebration",
  "School event",
  "Other",
] as const;

export const boothOptions = [
  {
    id: "mirror",
    label: "Mirror Photobooth",
    description: "Our signature interactive mirror experience.",
  },
  {
    id: "enclosed",
    label: "Enclosed Photobooth",
    description: "Private booth setup for classic photo strips.",
  },
  {
    id: "high-angle",
    label: "High-Angle Photobooth",
    description: "Elevated camera angle for group shots and flair.",
  },
  {
    id: "undecided",
    label: "Not sure yet",
    description: "We’ll help you pick the best fit for your event.",
  },
] as const;

export const durationOptions = [
  { value: "2", label: "2 hours" },
  { value: "3", label: "3 hours" },
  { value: "4", label: "4 hours" },
  { value: "5+", label: "5+ hours" },
] as const;

export type BookingOccasion = (typeof bookingOccasions)[number];
export type BoothOptionId = (typeof boothOptions)[number]["id"];

export type BookingDraft = {
  occasion: BookingOccasion | "";
  eventDate: string;
  startTime: string;
  duration: string;
  venue: string;
  city: string;
  guestCount: string;
  booth: BoothOptionId | "";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
};

export const emptyBookingDraft = (): BookingDraft => ({
  occasion: "",
  eventDate: "",
  startTime: "",
  duration: "",
  venue: "",
  city: "",
  guestCount: "",
  booth: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
});

export function boothLabel(id: BoothOptionId | "") {
  return boothOptions.find((option) => option.id === id)?.label ?? "";
}

export function formatBookingEmail(draft: BookingDraft) {
  const booth = boothLabel(draft.booth);
  const name = `${draft.firstName} ${draft.lastName}`.trim();

  return [
    "New Modern Pix booking request",
    "",
    "— Event —",
    `Occasion: ${draft.occasion}`,
    `Date: ${draft.eventDate}`,
    `Start time: ${draft.startTime || "TBD"}`,
    `Duration: ${draft.duration ? `${draft.duration} hours` : "TBD"}`,
    `Venue: ${draft.venue || "TBD"}`,
    `City / area: ${draft.city || "TBD"}`,
    `Expected guests: ${draft.guestCount || "TBD"}`,
    `Booth preference: ${booth || "TBD"}`,
    "",
    "— Contact —",
    `Name: ${name}`,
    `Email: ${draft.email}`,
    `Phone: ${draft.phone}`,
    "",
    "— Notes —",
    draft.notes.trim() || "(none)",
  ].join("\n");
}
