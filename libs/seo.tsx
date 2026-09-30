import type { Metadata } from "next";
import config from "@/config";

// Base keyword set: service terms + every area served. Individual pages can
// extend this via the `keywords` param for page-specific terms (see
// services/gallery/etc pages).
const baseKeywords = [
  config.appName,
  "custom stone fabrication",
  "granite countertops",
  "marble countertops",
  "quartz countertops",
  "onyx countertops",
  "granite fabricators",
  "granite repairs",
  config.cityState,
  ...config.serviceAreas,
  ...config.serviceAreas.map((area) => `granite countertops ${area}`),
  ...config.serviceAreas.map((area) => `stone fabrication ${area}`),
  ...config.serviceAreas.map((area) => `granite fabricators ${area}`),
  ...config.serviceAreas.map((area) => `granite repairs ${area}`),
];

// Prefills SEO tags with sensible defaults from config.ts. Override per-page
// via `export const metadata = getSEOTags({ title: "...", canonicalUrlRelative: "/about" })`.
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
}: Metadata & { canonicalUrlRelative?: string } = {}) => {
  return {
    title: title || config.appName,
    description: description || config.appDescription,
    keywords: keywords || baseKeywords,
    applicationName: config.appName,
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `https://${config.domainName}/`
    ),
    robots: { index: true, follow: true },
    openGraph: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      url: openGraph?.url || `https://${config.domainName}/`,
      siteName: config.appName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      card: "summary_large_image",
    },
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),
  };
};

// LocalBusiness structured data so Google can show rich results (phone,
// review link, service area) for the business. Edit the fields as real
// details come in. No logo file exists yet (see README) so `image` is left
// out rather than pointing at a 404 — add it back once a real logo exists.
export const renderLocalBusinessSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          name: config.appName,
          description: config.appDescription,
          url: `https://${config.domainName}/`,
          telephone: config.phone.tel,
          // No fixed storefront/showroom address confirmed for this
          // service-area business — list every county served instead of a
          // guessed address.
          areaServed: config.serviceAreas.map((area) => ({
            "@type": "AdministrativeArea",
            name: `${area}, FL`,
          })),
          sameAs: [config.instagramUrl, config.googleBusinessUrl].filter(Boolean),
        }),
      }}
    ></script>
  );
};
