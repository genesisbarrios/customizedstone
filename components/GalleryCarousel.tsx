"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

const AUTOPLAY_MS = 4000;

// Client component (needs state for the active slide) so the page itself
// can stay a server component and keep its `export const metadata`.
export default function GalleryCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (index: number) => setActive((index + photos.length) % photos.length);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Auto-advances on a timer, paused while the pointer is over the carousel
  // (or a control has focus, via focus/blur on the wrapper) so people can
  // actually read a caption or study a photo without it changing under them.
  // The effect re-runs whenever `active` changes — including from a manual
  // click — so a manual navigation always gets a fresh full interval instead
  // of advancing again almost immediately.
  useEffect(() => {
    if (paused || photos.length <= 1) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, photos.length]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden border border-base-300 bg-base-200">
        <Image
          key={photos[active].src}
          src={photos[active].src}
          alt={photos[active].alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-contain"
        />

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="btn btn-circle btn-sm sm:btn-md absolute left-3 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100 border-none"
        >
          ❮
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="btn btn-circle btn-sm sm:btn-md absolute right-3 top-1/2 -translate-y-1/2 bg-base-100/80 hover:bg-base-100 border-none"
        >
          ❯
        </button>

        <div className="absolute bottom-3 right-3 rounded-full bg-base-100/80 px-3 py-1 text-xs font-medium">
          {active + 1} / {photos.length}
        </div>
      </div>

      <p className="text-center text-sm text-base-content/60 mt-3">{photos[active].alt}</p>

      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 -mx-1 px-1">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}: ${photo.alt}`}
            aria-current={i === active}
            className={`relative w-20 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
              i === active ? "border-secondary" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={photo.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
