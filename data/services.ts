export interface Service {
  name: string;
  price: string;
  description: string;
  image?: string;
}

// Confirmed from the client's own site (customizedstone.net) — the material
// types and product lines actually named there. Pricing for stone
// fabrication varies heavily by slab, edge profile, and square footage, so
// these are framed as "Get a Quote" rather than guessed at real numbers.
// Granite/Marble/Quartz images were provided directly by the client
// (public/images/granite.webp, quartzcounter.webp, quartz.webp).
export const services: Service[] = [
  {
    name: "Granite Countertops",
    price: "Get a Quote",
    description: "Custom granite countertop fabrication and installation for kitchens and baths.",
    image: "/images/granite.webp",
  },
  {
    name: "Marble Countertops",
    price: "Get a Quote",
    description: "Elegant marble countertops, fabricated and installed to spec.",
    image: "/images/gallery/marble-island-open-kitchen.jpg",
  },
  {
    name: "Quartz Countertops",
    price: "Get a Quote",
    description: "Durable, low-maintenance engineered quartz countertops.",
    image: "/images/gallery/quartzcropped.png",
  },
  {
    name: "Onyx Countertops",
    price: "Get a Quote",
    description: "Custom onyx countertops for a true statement piece.",
  },
  {
    name: "Integrated Sinks",
    price: "Get a Quote",
    description: "Seamless integrated sinks fabricated directly into your countertop.",
  },
  {
    name: "Custom Stone Work",
    price: "Get a Quote",
    description: "Custom stone fabrication for any project, from concept to installation.",
  },
];
