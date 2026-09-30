import { ConfigProps } from "./types/config";

// ---------------------------------------------------------------------------
// This file is the single source of truth for everything client-specific.
// To reuse this template for a new web design client, fork the repo and only
// edit this file (plus the theme colors in tailwind.config.js) — every page
// and component reads from here instead of hardcoding client details.
// ---------------------------------------------------------------------------
const config = {
  appName: "Customized Stone",
  appDescription:
    "Customized Stone — custom stone fabrication and installation (granite, marble, quartz, onyx countertops) serving Miami-Dade, Broward, and Monroe County for over 20 years.",
  // Confirmed — the client's existing live domain.
  domainName: "customizedstone.net",

  // Unique identifier sent to the Enigma CRM backend so every submission from
  // this site is scoped to this client. Must be unique per client site.
  clientSlug: "customized-stone",

  // Confirmed from the client's existing site (customizedstone.net).
  phone: {
    display: "(786) 394-7065",
    tel: "7863947065",
  },

  // No single storefront/showroom address confirmed (a Yelp listing places
  // them generally in the 33126 zip) — using the general service area
  // instead of a guessed street address, same pattern as Javier Hardscaping.
  location: "Miami, FL",
  cityState: "Miami, FL",

  // Confirmed from the client's site: "serving Dade, Broward, Monroe
  // counties" — kept at the county level rather than expanding into a
  // guessed list of specific cities, since that's what's actually stated.
  serviceAreas: ["Miami-Dade County", "Broward County", "Monroe County"],

  primaryCta: {
    label: "Get a Free Quote",
    href: "/contact",
    external: false,
  },

  // Confirmed handle (@customizedstone) from the client's existing site —
  // exact profile URL constructed from it since no direct link was given.
  instagramUrl: "https://www.instagram.com/customizedstone/",
  // Confirmed — client-provided Facebook page link.
  facebookUrl: "https://www.facebook.com/CustomizedStone/",
  // Confirmed — client-provided Google review link (a share.google short
  // link, not a full Maps URL, but it resolves to their real listing).
  googleBusinessUrl: "https://share.google/UMK2zxVYhG9WYsGBR",
  // Confirmed — the client's real Yelp listing.
  yelpUrl: "https://www.yelp.com/biz/customized-stone-miami",
  // Confirmed — client-provided email.
  contactEmail: "stone.customized@gmail.com",
  // Logo under the business name in campaign email signatures (full URL —
  // www, since the bare domain doesn't resolve).
  emailLogoUrl: "https://www.customizedstone.net/images/CustomizedStoneTransparent.png",

  colors: {
    // See tailwind.config.js daisyui.themes for the "customizedstone" theme
    // definition — charcoal, warm bronze, and clean white/stone-gray for a
    // modern countertop-fabrication brand. Not sampled from a real logo (none
    // available yet).
    theme: "customizedstone",
    main: "#ffffff",
  },

} as ConfigProps;

export default config;
