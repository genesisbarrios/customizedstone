import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import config from "@/config";
import { services } from "@/data/services";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Stone Fabrication Services — ${config.appName}`,
  description:
    "Granite, marble, quartz, and onyx countertops, integrated sinks, and custom stone work — serving Miami-Dade, Broward, and Monroe County.",
  canonicalUrlRelative: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Header />
      {/* One marble texture photo stretches behind the whole page (services
          grid + contact form) so there's no break in the image, per client
          request. */}
      <main className="relative overflow-hidden">
        <Image
          src="/images/marblebg.jpg"
          alt="Marble texture"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <section className="relative">
          <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-6 w-full">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl tracking-wide">
                SERVICES
              </h1>
              <p className="text-base-content/70 mt-3 max-w-lg mx-auto">
                Granite, marble, quartz, and onyx countertops — custom
                fabrication and installation, done right.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="rounded-lg border border-base-300 bg-base-100 shadow-sm p-6"
                >
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-base-content/60 mt-1">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ready to start your project — mustard card on the shared marble
            background, styled like the About page newsletter card. */}
        <section className="relative">
          <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-28">
            <div className="max-w-xl mx-auto rounded-lg bg-secondary p-8 text-center">
              <h2 className="font-display text-2xl tracking-wide text-secondary-content">
                READY TO START YOUR PROJECT?
              </h2>
              <p className="text-sm text-secondary-content/80 mt-2">
                Tell us about your project and we&apos;ll get back to you with a
                free quote.
              </p>
              <div className="mt-6 text-left">
                <ContactForm buttonClassName="btn bg-black hover:bg-black/80 text-white border-black" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
