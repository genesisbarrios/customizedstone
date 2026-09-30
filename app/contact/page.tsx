import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageBanner from "@/components/PageBanner";
import SocialLinks from "@/components/SocialLinks";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `Contact Us — Free Quote — ${config.appName}`,
  description:
    "Get a free stone fabrication quote in Miami-Dade, Broward, and Monroe County.",
  canonicalUrlRelative: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          title="CONTACT US"
          description="Ready to start your project? Send us a message or reach out directly for a free quote."
        />

        <section className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl tracking-wide mb-6">
              SEND A MESSAGE
            </h2>
            <ContactForm />
          </div>

          <div>
            <h2 className="font-display text-2xl tracking-wide mb-6">
              GET IN TOUCH
            </h2>
            <div className="flex flex-col gap-4 text-base-content/80">
              <p>Serving {config.location}.</p>
              <p>
                For the fastest response, call or text{" "}
                <a href={`tel:${config.phone.tel}`} className="link text-primary">
                  {config.phone.display}
                </a>
                .
              </p>
              {config.contactEmail && (
                <p>
                  Or email us at{" "}
                  <a href={`mailto:${config.contactEmail}`} className="link text-primary">
                    {config.contactEmail}
                  </a>
                  .
                </p>
              )}
            </div>
            <div className="mt-6">
              <SocialLinks
                variant="mustard"
                className="flex-col items-start gap-4"
                only={["instagram", "facebook", "google", "yelp", "phone", "email"]}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
