import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { areaServices, areasInCounty, getArea, searchTerms, serviceAreas } from "@/data/serviceAreas";

// One statically generated landing page per county/city in data/serviceAreas.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ area: a.slug }));
}

export function generateMetadata({ params }: { params: { area: string } }) {
  const area = getArea(params.area);
  if (!area) return {};
  const place = area.isCounty ? area.name : `${area.name}, FL`;
  return getSEOTags({
    title: `Granite Countertops, Fabricators & Repairs in ${place} — ${config.appName}`,
    description: `Local granite fabricators serving ${place}: granite countertops, granite repairs, marble, quartz, and onyx countertops, and integrated sinks — fabricated and installed by ${config.appName}. Free quotes.`,
    keywords: [
      ...searchTerms.map((t) => `${t} ${area.name}`),
      ...searchTerms.slice(0, 4).map((t) => `${t} near me`),
      ...(area.isCounty ? [] : searchTerms.slice(0, 3).map((t) => `${t} ${area.county}`)),
      area.name,
      config.appName,
    ],
    canonicalUrlRelative: `/service-areas/${area.slug}`,
  });
}

export default function ServiceAreaPage({ params }: { params: { area: string } }) {
  const area = getArea(params.area);
  if (!area) notFound();

  const place = area.isCounty ? area.name : `${area.name}, FL`;
  const nearby = (area.isCounty ? areasInCounty(area.county) : areasInCounty(area.county).filter((a) => a.slug !== area.slug)).slice(0, 18);
  const countyPage = serviceAreas.find((a) => a.isCounty && a.county === area.county);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Granite and stone countertop fabrication, installation, and repair",
    provider: { "@type": "LocalBusiness", name: config.appName, telephone: config.phone.tel, url: `https://${config.domainName}/` },
    areaServed: { "@type": area.isCounty ? "AdministrativeArea" : "City", name: place },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Stone countertop services",
      itemListElement: areaServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
    },
  };

  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <PageBanner
          title={`GRANITE & STONE IN ${area.name.toUpperCase()}`}
          description={`Granite fabricators, granite repairs, and custom countertops in ${place}.`}
        />

        <section className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="font-display text-2xl tracking-wide mb-4">
            GRANITE FABRICATORS SERVING {area.name.toUpperCase()}
          </h2>
          <div className="flex flex-col gap-4 text-base-content/80 leading-relaxed">
            <p>
              {config.appName} fabricates, installs, and repairs granite, marble, quartz, and onyx countertops for
              homes and businesses in {place}
              {area.isCounty ? "" : ` and across ${area.county}`}. Whether you need new granite countertops for a
              kitchen remodel, a bathroom vanity top, or granite repairs on a chipped or cracked counter, we handle
              it from measurement through installation.
            </p>
            <p>
              Call{" "}
              <a href={`tel:${config.phone.tel}`} className="link link-primary">
                {config.phone.display}
              </a>{" "}
              or send us a message below for a free quote in {area.name}.
            </p>
          </div>

          <h2 className="font-display text-2xl tracking-wide mt-12 mb-4">SERVICES IN {area.name.toUpperCase()}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {areaServices.map((s) => (
              <div key={s.name} className="rounded-lg border border-base-300 bg-base-100 p-5">
                <h3 className="font-semibold">
                  {s.name} in {area.name}
                </h3>
                <p className="text-sm text-base-content/60 mt-1">{s.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <Link href="/services" className="link link-primary">See all services</Link>
          </p>

          {nearby.length > 0 && (
            <>
              <h2 className="font-display text-2xl tracking-wide mt-12 mb-4">
                {area.isCounty ? `CITIES WE SERVE IN ${area.name.toUpperCase()}` : "NEARBY AREAS"}
              </h2>
              <div className="flex flex-wrap gap-2">
                {!area.isCounty && countyPage && (
                  <Link href={`/service-areas/${countyPage.slug}`} className="badge badge-lg badge-outline">
                    {countyPage.name}
                  </Link>
                )}
                {nearby.map((a) => (
                  <Link key={a.slug} href={`/service-areas/${a.slug}`} className="badge badge-lg badge-outline">
                    {a.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 rounded-lg bg-secondary p-8">
            <h2 className="font-display text-2xl tracking-wide text-secondary-content text-center">
              GET A FREE QUOTE IN {area.name.toUpperCase()}
            </h2>
            <div className="mt-6">
              <ContactForm buttonClassName="btn bg-black hover:bg-black/80 text-white border-black" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
