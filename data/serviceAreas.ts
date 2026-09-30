// Local SEO landing pages — one per county and city in the service area
// (config.serviceAreas: Miami-Dade, Broward, Monroe). Each renders at
// /service-areas/[slug] with every search term below in its title,
// description, keywords, and body copy.

export type County = "Miami-Dade County" | "Broward County" | "Monroe County";

export interface ServiceArea {
  slug: string;
  name: string;
  county: County;
  isCounty?: boolean;
}

const city = (name: string, county: County): ServiceArea => ({
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
  county,
});

export const serviceAreas: ServiceArea[] = [
  { slug: "miami-dade-county", name: "Miami-Dade County", county: "Miami-Dade County", isCounty: true },
  { slug: "broward-county", name: "Broward County", county: "Broward County", isCounty: true },
  { slug: "monroe-county", name: "Monroe County", county: "Monroe County", isCounty: true },

  ...[
    "Miami", "Miami Beach", "Coral Gables", "Kendall", "Doral", "Hialeah", "Homestead", "Aventura",
    "Pinecrest", "Palmetto Bay", "Cutler Bay", "Miami Lakes", "Key Biscayne", "North Miami",
    "Sunny Isles Beach", "South Miami", "Miami Gardens", "Westchester",
  ].map((n) => city(n, "Miami-Dade County")),

  ...[
    "Fort Lauderdale", "Hollywood", "Pembroke Pines", "Miramar", "Weston", "Coral Springs",
    "Pompano Beach", "Davie", "Plantation", "Sunrise", "Hallandale Beach", "Cooper City", "Parkland",
    "Deerfield Beach", "Lauderhill", "Tamarac", "Margate", "Coconut Creek",
  ].map((n) => city(n, "Broward County")),

  ...["Key West", "Key Largo", "Islamorada", "Marathon", "Big Pine Key", "Tavernier"].map((n) =>
    city(n, "Monroe County")
  ),
];

// Every way people search for this work — each is paired with the area name
// in that page's keywords, and the headline ones go in its title/description.
export const searchTerms = [
  "granite countertops",
  "granite fabricators",
  "granite repairs",
  "granite countertop installation",
  "countertop repair",
  "marble countertops",
  "quartz countertops",
  "onyx countertops",
  "kitchen countertops",
  "bathroom vanity tops",
  "integrated sinks",
  "stone fabrication",
  "countertop fabricators",
];

// Services listed on every area page. Mirrors data/services.ts plus
// fabrication and repair, which people search for by those names.
export const areaServices = [
  { name: "Granite Fabrication", description: "Custom granite countertops cut, finished, and installed for kitchens and baths." },
  { name: "Granite Repairs", description: "Chip, crack, and seam repairs to restore damaged granite countertops." },
  { name: "Marble Countertops", description: "Elegant marble countertops, fabricated and installed to spec." },
  { name: "Quartz Countertops", description: "Durable, low-maintenance engineered quartz countertops." },
  { name: "Onyx Countertops", description: "Custom onyx countertops for a true statement piece." },
  { name: "Integrated Sinks", description: "Seamless integrated sinks fabricated directly into your countertop." },
];

export const getArea = (slug: string) => serviceAreas.find((a) => a.slug === slug);

export const areasInCounty = (county: County) => serviceAreas.filter((a) => a.county === county && !a.isCounty);
