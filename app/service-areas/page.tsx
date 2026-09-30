import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { areasInCounty, serviceAreas } from "@/data/serviceAreas";

export const metadata = getSEOTags({
  title: `Service Areas — Granite Fabricators & Repairs in South Florida — ${config.appName}`,
  description:
    "Granite countertops, granite fabricators, and granite repairs across Miami-Dade, Broward, and Monroe County — Miami, Kendall, Doral, Fort Lauderdale, Key West, and more.",
  canonicalUrlRelative: "/service-areas",
});

export default function ServiceAreasPage() {
  const counties = serviceAreas.filter((a) => a.isCounty);
  return (
    <>
      <Header />
      <main>
        <PageBanner
          title="SERVICE AREAS"
          description="Granite fabrication, installation, and repairs across South Florida."
        />
        <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          {counties.map((county) => (
            <div key={county.slug}>
              <Link href={`/service-areas/${county.slug}`} className="font-display text-2xl tracking-wide link link-hover">
                {county.name.toUpperCase()}
              </Link>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {areasInCounty(county.county).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/service-areas/${a.slug}`} className="link link-hover text-base-content/80">
                      Granite countertops &amp; repairs in {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
