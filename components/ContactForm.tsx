"use client";

import { useState, FormEvent } from "react";
import config from "@/config";
import { TurnstileWidget, useSpamGuard } from "@/components/SpamGuard";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  buttonClassName = "btn btn-secondary",
}: {
  // Override when this form sits on a bg-secondary card — "btn-secondary"
  // would otherwise blend into the background.
  buttonClassName?: string;
} = {}) {
  const [status, setStatus] = useState<Status>("idle");
  // Honeypot — real users never see or fill this; bots that auto-fill every
  // input on the page do. Combined with formLoadedAt (a timing trap: humans
  // take at least a couple seconds to fill the form) on the backend.
  const [formLoadedAt] = useState(() => Date.now());
  const spamGuard = useSpamGuard();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/crm/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSlug: config.clientSlug,
          clientName: config.appName,
          clientContactEmail: config.contactEmail,
          clientPhone: config.phone.tel,
          clientWebsite: config.domainName,
          clientInstagram: config.instagramUrl,
          clientGoogleBusinessUrl: config.googleBusinessUrl,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          source: "contact_form",
          website: data.get("website"),
          formLoadedAt,
          ...spamGuard.getFields(data),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      spamGuard.reset();
      setStatus("error");
    }
  };

  if (status === "success") {
    // Solid base-100/base-content colors (not primary/base-content-derived
    // ones) so this reads correctly regardless of what section color this
    // form is dropped into — it's now used on both a light section (/contact)
    // and a dark bg-primary one (homepage).
    return (
      <div className="rounded-lg border border-base-300 bg-base-100 text-base-content p-6 text-center shadow">
        <p className="font-medium">Thanks — we got your message.</p>
        <p className="text-sm text-base-content/70 mt-1">
          We&apos;ll get back to you shortly with a free quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot — hidden from real users, tempting for bots that auto-fill every field */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full name"
          required
          className="input input-bordered w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="input input-bordered w-full"
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        required
        className="input input-bordered w-full"
      />
      <textarea
        name="message"
        placeholder="Tell us about your project (countertops, custom stone work, etc.)"
        rows={4}
        className="textarea textarea-bordered w-full"
      />
      <TurnstileWidget widgetIdRef={spamGuard.widgetIdRef} />
      <button
        type="submit"
        disabled={status === "loading"}
        className={buttonClassName}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-error text-sm">
          Something went wrong — please call or text us at {config.phone.display} instead.
        </p>
      )}
    </form>
  );
}
