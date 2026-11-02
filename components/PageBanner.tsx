import Image from "next/image";

// Shared page-title banner: a real marble countertop photo (provided by the
// client) with a dark overlay, used behind the heading on every page.
// Custom object-position (30% from the top) keeps the crop centered on the
// countertop/backsplash detail — plain object-top went too far and cut into
// the cabinets above, while the default center crop showed too much floor.
// `compact` = a slim title bar for pages where the content should start right
// away (e.g. the gallery slideshow).
export default function PageBanner({
  title,
  description,
  compact = false,
}: {
  title: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-base-300">
      <Image
        src="/images/marblecountertop.webp"
        alt="Marble countertop and backsplash"
        fill
        priority
        sizes="100vw"
        className="object-cover animate-banner-zoom object-[center_30%]"
      />
      <div className="absolute inset-0 bg-primary/80" />

      <div className={`relative max-w-6xl mx-auto px-6 text-center ${compact ? "py-5" : "py-16"}`}>
        <h1
          className={`font-display tracking-wide text-primary-content ${
            compact ? "text-2xl md:text-3xl" : "text-4xl md:text-5xl"
          }`}
        >
          {title}
        </h1>
        {description && !compact && (
          <p className="text-primary-content/80 mt-3 max-w-lg mx-auto">{description}</p>
        )}
      </div>
    </section>
  );
}
