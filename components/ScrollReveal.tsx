"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Site-wide scroll animations (same effect as arielconstructionmiami's
// <Reveal>, applied automatically so pages don't need wrapping):
// - The first section's headline, text and buttons fade up on load.
// - Every later section's headings and card-grid items fade + slide in the
//   first time they scroll into view; grid items stagger.
// - Cards in those grids lift on hover and zoom their photo.
// Styles live in globals.css (.reveal / .reveal-in / .lift / .hero-in).
// Opt an element (and everything inside it) out with data-no-reveal.
// Skipped on /admin and under prefers-reduced-motion.
const HERO_SELECTOR = "h1, h1 ~ p, h1 + div, .btn";
const SECTION_SELECTOR = "h2, h2 + p, .grid > *";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    if (!sections.length) return;
    const skip = (el: Element) => !!el.closest("[data-no-reveal]");
    // Leave anything that already has its own entrance animation alone.
    const animated = (el: Element) => !!el.closest('[class*="animate-"]');

    // Hero entrance — staggered fade-up, once on load.
    const [hero, ...rest] = sections;
    const heroItems = Array.from(hero.querySelectorAll<HTMLElement>(HERO_SELECTOR)).filter(
      (el, i, all) => !skip(el) && !animated(el) && !all.some((other) => other !== el && other.contains(el))
    );
    heroItems.forEach((el, i) => {
      el.style.animationDelay = `${i * 150}ms`;
      el.classList.add("hero-in");
    });

    // Scroll reveals for everything below the hero.
    const items: HTMLElement[] = [];
    rest.forEach((section) => {
      section.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((el) => {
        if (skip(el) || items.some((other) => other.contains(el))) return;
        const parent = el.parentElement;
        if (parent?.classList.contains("grid")) {
          const index = Array.from(parent.children).indexOf(el);
          el.style.setProperty("--reveal-delay", `${(index % 4) * 100}ms`);
          if (/\b(rounded|border|card|shadow)/.test(el.className)) el.classList.add("lift");
        }
        el.classList.add("reveal");
        items.push(el);
      });
    });

    // Reveal anything in view or already scrolled past. A position check on
    // scroll (rather than an IntersectionObserver) also catches elements a
    // fast scroll skips over entirely on slow frames, e.g. behind a 3D hero.
    const pending = new Set(items);
    let frame = 0;
    const check = () => {
      frame = 0;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight - 40) return;
        pending.delete(el);
        el.classList.add("reveal-in");
        // Once in, drop the entrance delay so hover reacts immediately.
        el.addEventListener("transitionend", () => el.classList.add("revealed"), { once: true });
      });
      if (!pending.size) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Next frame, so above-the-fold items still animate in from their start.
    frame = requestAnimationFrame(check);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      heroItems.forEach((el) => {
        el.classList.remove("hero-in");
        el.style.animationDelay = "";
      });
      items.forEach((el) => {
        el.classList.remove("reveal", "reveal-in", "revealed", "lift");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
