import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import GalleryCarousel from "@/components/GalleryCarousel";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Project Gallery — ${config.appName}`,
  description: `Real granite, marble, quartz, and onyx installation projects from ${config.appName}.`,
  canonicalUrlRelative: "/gallery",
});

// Real project photos
const photos = [
  { src: "/images/gallery/white-marble-backsplash-kitchen.jpg", alt: "White kitchen with marble backsplash and countertops" },
  { src: "/images/gallery/marble-island-open-kitchen.jpg", alt: "White marble waterfall-edge island in an open kitchen" },
  { src: "/images/gallery/white-quartz-waterfall-island.jpg", alt: "White quartz waterfall-edge island with dark cabinets" },
  { src: "/images/gallery/gray-granite-full-backsplash.jpg", alt: "Gray granite countertops with full-height backsplash" },
  { src: "/images/gallery/green-granite-kitchen-island.jpg", alt: "Green and gray granite countertops and island" },
  { src: "/images/gallery/white-quartz-corner-counter.jpg", alt: "White quartz corner countertop, kitchen in progress" },
  { src: "/images/gallery/white-quartz-teal-island.jpg", alt: "White quartz countertops with a teal-sided island" },
  { src: "/images/gallery/onyx-backlit-bar-1.jpg", alt: "Backlit onyx bar countertop, glowing amber" },
  { src: "/images/gallery/onyx-backlit-bar-2.jpg", alt: "Backlit onyx bar countertop, close angle" },
  { src: "/images/gallery/granite.webp", alt: "Granite countertop edge detail with dramatic veining" },
  { src: "/images/gallery/kitchen.webp", alt: "Dark cabinet kitchen with granite island" },
  { src: "/images/gallery/counter.webp", alt: "Modern kitchen island with glass block window" },
  { src: "/images/gallery/bathroom.webp", alt: "Marble-tiled bathroom shower and vanity" },
  { src: "/images/gallery/backyard.webp", alt: "Outdoor kitchen countertop with sink, overlooking a pool" },
  { src: "/images/gallery/table.webp", alt: "Custom stone dining table poolside" },
  { src: "/images/gallery/wallgranite.webp", alt: "Large onyx wall panel feature" },
  { src: "/images/gallery/closet.webp", alt: "Walk-in closet with white stone-topped island and cabinetry" },
  { src: "/images/gallery/kitchenmarble.webp", alt: "White marble waterfall island under a stainless range hood" },
  { src: "/images/gallery/kitchenwhite.webp", alt: "All-white kitchen with a long quartz island" },
  { src: "/images/gallery/kitchenwhite2.webp", alt: "White quartz countertops with wood-tone cabinets" },
  { src: "/images/gallery/kitchenwood.webp", alt: "White quartz countertops with light wood cabinets" },
  { src: "/images/gallery/sink.webp", alt: "Glass vessel sink on a white quartz vanity top" },
  { src: "/images/gallery/bathroom2.webp", alt: "Floating double-sink vanity with backlit mirror" },
  { src: "/images/gallery/bathroomwhite.webp", alt: "White quartz vanity top with wood-tile backsplash" },
  { src: "/images/gallery/kitchenmarkble2.webp", alt: "White marble waterfall island, kitchen in progress" },
  { src: "/images/gallery/kitchenwood2.webp", alt: "Wood-tone kitchen with stainless built-in refrigerator" },
  { src: "/images/gallery/kitchenwood3.webp", alt: "Wood-tone cabinets with white quartz countertop and under-cabinet lighting" },
  { src: "/images/gallery/bathroom3.webp", alt: "Dark wood vanity with pendant lighting and full mirror" },
  { src: "/images/gallery/bathroomwhite2.webp", alt: "White quartz double-sink vanity with wood cabinetry" },
  { src: "/images/gallery/shower.webp", alt: "Tiled shower niche with wood-look accent wall" },
  { src: "/images/gallery/sink2.webp", alt: "Stainless utility sink on a white quartz countertop" },
  { src: "/images/gallery/tub.webp", alt: "Custom stone surround for an oval soaking tub" },
  { src: "/images/gallery/kitchen4.webp", alt: "Marble waterfall island with sink, view into dining room" },
];

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          title="GALLERY"
          description="Real granite, marble, quartz, and onyx installations."
        />

        <section className="max-w-3xl mx-auto px-6 py-16">
          <GalleryCarousel photos={photos} />

          <div className="text-center mt-12">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              See More on Instagram
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
