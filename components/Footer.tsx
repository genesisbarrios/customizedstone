import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-secondary" id="footer">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div>
            <Image
              src="/images/CustomizedStoneTransparent.png"
              alt={`${config.appName} logo`}
              width={195}
              height={65}
              className="h-10 w-auto"
            />
            <p className="mt-3 text-sm text-secondary-content/80 max-w-xs">
              {config.appDescription}
            </p>
            <p className="mt-4 text-xs text-secondary-content/70">
              Copyright &copy; {new Date().getFullYear()} —{" "}
              <a
                href="https://enigma-labs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover"
              >
                Developed by Enigma Labs
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-secondary-content/70 mb-3">
                Site
              </div>
              <div className="flex flex-col gap-2 text-sm text-secondary-content">
                <Link href="/services" className="link link-hover">Services</Link>
                <Link href="/gallery" className="link link-hover">Gallery</Link>
                <Link href="/about" className="link link-hover">About</Link>
                <Link href="/contact" className="link link-hover">Contact</Link>
                <Link href="/service-areas" className="link link-hover">Service Areas</Link>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-secondary-content/70 mb-3">
                Service Area
              </div>
              <div className="flex flex-col gap-2 text-sm text-secondary-content/80">
                <span>Miami-Dade, Broward, and Monroe County</span>
                <span>Granite fabricators &amp; granite repairs</span>
                <Link href="/service-areas" className="link link-hover">All service areas</Link>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs uppercase tracking-widest text-secondary-content/70 mb-3">
                Connect
              </div>
              <SocialLinks className="flex-col items-start gap-3" variant="light" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
