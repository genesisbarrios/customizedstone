import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";
import NewsletterForm from "@/components/NewsletterForm";
import ContactForm from "@/components/ContactForm";
import PrimaryCta from "@/components/PrimaryCta";
import config from "@/config";
import { services } from "@/data/services";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `${config.appName} | Custom Stone Fabrication in Miami`,
  description: `Granite, marble, quartz, and onyx countertops — custom stone fabrication and installation serving Miami-Dade, Broward, and Monroe County. Free quotes from ${config.appName}.`,
  canonicalUrlRelative: "/",
});

const servicesPreview = services.slice(0, 3);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — granite countertop photo, provided directly by the client. */}
        <section className="relative overflow-hidden border-b border-base-300">
          <Image
            src="/images/gallery/gray-granite-full-backsplash.jpg"
            alt="Gray granite countertops with full-height backsplash"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />

          <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
            <p className="uppercase tracking-[0.4em] text-secondary text-xs md:text-sm mb-6">
              {config.cityState} · 20+ Years of Craftsmanship
            </p>
            <h1 className="font-display text-5xl md:text-7xl tracking-wide leading-tight text-primary-content">
              CUSTOM STONE.
              <br />
              <span className="text-secondary">BUILT TO LAST.</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-primary-content/80 text-lg">
              Granite, marble, quartz, and onyx countertops — custom
              fabrication and installation, done right.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryCta className="btn btn-secondary btn-lg" />
              <a
                href={`tel:${config.phone.tel}`}
                className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary"
              >
                Call {config.phone.display}
              </a>
            </div>

            <div className="mt-12 flex justify-center">
              <SocialLinks variant="light" className="items-center" iconOnly />
            </div>
          </div>
        </section>

        {/* Services preview — marble texture photo, provided directly by
            the client. */}
        <section className="relative overflow-hidden border-y border-base-300">
          <Image
            src="/images/marblebg.jpg"
            alt="Marble texture"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl tracking-wide">
                OUR SERVICES
              </h2>
              <p className="text-base-content/60 mt-2">
                Quality craftsmanship and superior customer service on every
                project.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesPreview.map((service) => (
                <div
                  key={service.name}
                  className="rounded-lg overflow-hidden border border-base-300 bg-base-100 shadow-sm"
                >
                  {service.image && (
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <p className="text-sm text-base-content/60 mt-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/services" className="btn btn-outline">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Why Customized Stone */}
        <section className="bg-secondary">
          <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="font-display text-xl tracking-wide text-secondary-content">
                20+ YEARS EXPERIENCE
              </h3>
              <p className="text-sm text-secondary-content/80 mt-2">
                Two decades of quality craftsmanship in stone fabrication and
                installation.
              </p>
              <div className="relative w-32 h-32 rounded-lg overflow-hidden mt-4 mx-auto">
                <Image
                  src="/images/installcountertop.webp"
                  alt="Fabricator polishing a granite countertop edge"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wide text-secondary-content">
                FREE QUOTES
              </h3>
              <p className="text-sm text-secondary-content/80 mt-2">
                Every project starts with a free, no-pressure quote.
              </p>
              <div className="relative w-32 h-32 rounded-lg overflow-hidden mt-4 mx-auto">
                <Image
                  src="/images/freequotes.jpg"
                  alt="Fabricator leveling a sink cutout with a torpedo level"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl tracking-wide text-secondary-content">
                SERVING SOUTH FLORIDA
              </h3>
              <p className="text-sm text-secondary-content/80 mt-2">
                Miami-Dade, Broward, and Monroe County.
              </p>
              <div className="relative w-32 h-32 rounded-lg overflow-hidden mt-4 mx-auto">
                <Image
                  src="/images/miamipin.webp"
                  alt="Map pin marking Miami, Florida"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ready to start your project — real contact form instead of just
            a "Get a Free Quote" button, so visitors can convert right here. */}
        <section className="bg-primary text-primary-content">
          <div className="max-w-xl mx-auto px-6 py-20 text-center">
            <h2 className="font-display text-3xl md:text-4xl tracking-wide">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="mt-3 text-primary-content/80">
              Tell us about your project and we&apos;ll get back to you with a
              free quote.
            </p>
            <div className="mt-8 text-left">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl tracking-wide">
            GET EXCLUSIVE OFFERS
          </h2>
          <p className="text-base-content/60 mt-2 max-w-md mx-auto">
            Join our list for first access to promos and seasonal offers.
          </p>
          <div className="mt-6 flex justify-center">
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
