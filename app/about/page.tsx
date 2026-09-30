import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import PageBanner from "@/components/PageBanner";
import SocialLinks from "@/components/SocialLinks";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
  title: `About Us — ${config.appName}`,
  description:
    "Custom stone fabrication and installation company serving Miami-Dade, Broward, and Monroe County for over 20 years.",
  canonicalUrlRelative: "/about",
});

// Real reviews provided by the client — three from Google Maps (name, Local
// Guide status, review count, time posted) and two from Yelp (name, city,
// a "First to Review"/photo-count badge, date).
const reviews = [
  {
    name: "Pablo Perez-Bedmar",
    meta: "7 reviews",
    time: "6 months ago",
    text: "Excellent work from Celso! The custom stone piece came out beautifully, clean, precise, and with a very professional finish. Celso was highly responsive throughout the process, focused on delivering exactly what we needed, on time and as agreed. Highly recommend!",
  },
  {
    name: "Christina Lopez",
    meta: "Local Guide · 19 reviews",
    time: "3 years ago",
    text: "Love working with Celso. Always a great experience",
  },
  {
    name: "Alice Caceres",
    meta: "Local Guide · 16 reviews",
    time: "3 years ago",
    text: "Great group, very responsible and helpful.",
  },
  {
    name: "Idanell R.",
    meta: "Homestead, FL",
    time: "Sep 18, 2018",
    text: "Where do I begin...they have been amazing. From the first 5 minutes of speaking with them I knew that they were the company to fabricate and install my countertop. We had found these quartzite crystal slabs that either no one wanted to touch or their cost to fabricate was completely unreasonable. Customized Stone not only gave us a fair price they went with us to the slab retailer to ensure we were getting the best pick of the available slabs. Unfortunately, the original slab I wanted was cracked but they found a similar quartzite that was perfect. We had a million questions and they were always available to answer them and worked with us when our job was delayed multiple times. If you are looking for quality work and a dependable company don't hesitate to contact them. You won't be disappointed.",
  },
  {
    name: "Brian T.",
    meta: "Miami, FL · First to Review",
    time: "Oct 28, 2017",
    text: "Since renovating our house back in 2015 we have definitely had some issues with skilled workers, but not with Customized Stone. Our beautiful stone table outside got cracked due to hurricane Irma, so we contacted a few stone workers and we ended up choosing Customized Stone. Wow, they did an amazing job. After they removed the old support backing that had deteriorated due to the outside elements the table actually was in four pieces and they patched it up to where you cannot even see where the cracks are. They added additional support underneath and used treated wood to handle the South Florida outside elements, and then they did a polish on it that made it look brand new. I must admit I was a little worried due to some of the bad service we have received, but Customized Stone renewed our faith. Not only will I recommend them, but we will definitely use them again.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          title="ABOUT CUSTOMIZED STONE"
          description="Contact us for all of your Customized Stone needs."
        />

        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex flex-col gap-4 text-base-content/80 leading-relaxed">
            <p>
              For over 20 years, Customized Stone has fabricated and
              installed granite, marble, quartz, and onyx countertops across
              South Florida — along with integrated sinks and custom stone
              work of every kind.
            </p>
            <p>
              We&apos;re built on quality craftsmanship and superior customer
              service, with competitive pricing on every job. Whether
              it&apos;s a full kitchen remodel or a single custom piece, we
              take the time to turn your design into a finished installation
              you&apos;ll have for years.
            </p>
             <p>
              <a href="/contact" className="link link-primary link-hover">
                Contact us today for an appointment.
              </a>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            <SocialLinks variant="mustard" className="items-center" />
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl tracking-wide mb-4">
              SERVICE AREA
            </h2>
            <p className="text-base-content/80">{config.location}</p>
            <p className="text-sm text-base-content/60 mt-1">
              Serving {config.serviceAreas.join(", ")}.
            </p>
          </div>

          <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
            <h2 className="font-display text-2xl tracking-wide text-secondary-content">
              GET EXCLUSIVE OFFERS
            </h2>
            <p className="text-sm text-secondary-content/80 mt-2 mb-6">
              Sign up for first access to promos and seasonal offers.
            </p>
            <div className="flex justify-center">
              <NewsletterForm
                buttonClassName="btn shrink-0 bg-black hover:bg-black/80 text-white border-black"
                successClassName="text-secondary-content font-semibold"
              />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl tracking-wide text-center">
              WHAT PEOPLE ARE SAYING
            </h2>
            <p className="text-sm text-base-content/60 text-center mt-2 mb-8">
              Real reviews from our customers on Google and Yelp.
            </p>
            <div className="flex flex-col gap-6">
              {reviews.map((review) => (
                <div
                  key={review.name}
                  className="rounded-lg border border-base-300 bg-base-200 p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-primary text-sm" aria-label="5 out of 5 stars">
                      ★★★★★
                    </span>
                  </div>
                  <span className="text-xs text-base-content/50 mt-1 block">
                    {review.meta} · {review.time}
                  </span>
                  <p className="text-sm text-base-content/80 mt-4 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {config.googleBusinessUrl && (
                <a
                  href={config.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover text-sm"
                >
                  See more reviews on Google
                </a>
              )}
              {config.yelpUrl && (
                <a
                  href={config.yelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover text-sm"
                >
                  See more reviews on Yelp
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
