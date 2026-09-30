"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import PrimaryCta from "./PrimaryCta";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4"
        aria-label="Global"
      >
        <Link href="/" title={`${config.appName} homepage`}>
          <Image
            src="/images/CustomizedStoneTransparent.png"
            alt={`${config.appName} logo`}
            width={195}
            height={65}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link link-hover text-sm uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <PrimaryCta className="btn btn-secondary btn-sm" />
        </div>

        <button
          type="button"
          className="lg:hidden p-2"
          onClick={() => setIsOpen(true)}
          aria-label="Open main menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>

      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-base-100 border-l border-base-300 px-6 py-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/images/CustomizedStoneTransparent.png"
                alt={`${config.appName} logo`}
                width={165}
                height={55}
                className="h-8 w-auto"
              />
            </div>
            <button
              type="button"
              className="p-2"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-y-6 mt-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
            <PrimaryCta />
          </div>
        </div>
      </div>
    </header>
  );
}
