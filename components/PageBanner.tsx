import Image from "next/image";

// Shared page-title banner: a real marble countertop photo (provided by the
// client) with a dark overlay, used behind the heading on every page.
// Custom object-position (30% from the top) keeps the crop centered on the
// countertop/backsplash detail — plain object-top went too far and cut into
// the cabinets above, while the default center crop showed too much floor.
export default function PageBanner({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-base-300">
      <Image
        src="/images/marblecountertop.webp"
        alt="Marble countertop and backsplash"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl tracking-wide text-primary-content">
          {title}
        </h1>
        {description && (
          <p className="text-primary-content/80 mt-3 max-w-lg mx-auto">{description}</p>
        )}
      </div>
    </section>
  );
}
