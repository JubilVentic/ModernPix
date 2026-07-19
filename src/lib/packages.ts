/** Placeholder package copy for proof-of-concept — replace with owner-confirmed details. */

export const packageTiers = [
  {
    id: "essentials",
    name: "Essentials",
    hours: "2 hours",
    priceFrom: "₱8,500",
    blurb: "Perfect for intimate gatherings and shorter programs.",
    featured: false,
    includes: [
      "Choice of booth style",
      "On-site attendant",
      "Unlimited digital shares",
      "Up to 100 instant prints",
      "Standard print layout",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    hours: "3 hours",
    priceFrom: "₱12,500",
    blurb: "Our most-booked option for weddings and milestone parties.",
    featured: true,
    includes: [
      "Choice of booth style",
      "On-site attendant",
      "Unlimited digital shares",
      "Unlimited instant prints*",
      "Custom-themed print layout",
      "Props starter set",
    ],
  },
  {
    id: "celebration",
    name: "Celebration",
    hours: "4 hours",
    priceFrom: "₱16,500",
    blurb: "For big guest lists and all-night celebration energy.",
    featured: false,
    includes: [
      "Choice of booth style",
      "On-site attendant",
      "Unlimited digital shares",
      "Unlimited instant prints*",
      "Custom-themed print layout",
      "Expanded props & backdrop",
      "Priority date hold",
    ],
  },
] as const;

export const packageAddOns = [
  { name: "Extra hour", detail: "From ₱2,500 / hour" },
  { name: "Custom template design", detail: "From ₱1,500" },
  { name: "Second booth setup", detail: "Quote on request" },
  { name: "Premium prop kit", detail: "From ₱800" },
  { name: "Guest digital gallery", detail: "Included on Signature+" },
] as const;

export const packageNotes = [
  {
    title: "What’s usually included",
    body: "Booth setup and teardown, power guidance, an attendant for the rental window, instant prints, and a shareable digital copy for guests.",
  },
  {
    title: "Service area",
    body: "Based in Iligan. Events across Northern Mindanao are welcome — travel beyond the city may include a modest transport fee depending on distance.",
  },
  {
    title: "Lead time",
    body: "We recommend booking at least 2–3 weeks ahead. Peak wedding months fill faster, so earlier is better for preferred dates.",
  },
  {
    title: "Print volume",
    body: "Essentials includes a print allowance. Signature and Celebration are built for busier booths with higher print volume.",
  },
] as const;
