"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

const AUTOPLAY_MS = 5000;
const SWIPE_PX = 40;

// Full-width, near-full-screen slideshow: one photo at a time on a dark
// stage, with a blurred copy of the same photo filling the space around it
// (so portrait and landscape shots both fill the screen). No thumbnails or
// captions — alt text is kept for screen readers only. Arrows, swipe, and
// the keyboard's arrow keys navigate; the corner button goes true
// fullscreen. Client component so the page can stay a server component and
// keep its `export const metadata`.
export default function GalleryCarousel({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const goTo = (index: number) => setActive((index + photos.length) % photos.length);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Auto-advances, paused while the pointer is over the stage. Re-runs on
  // every slide change so a manual navigation gets a fresh full interval.
  useEffect(() => {
    if (paused || photos.length <= 1) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Preload the next photo so advancing doesn't flash.
  useEffect(() => {
    if (photos.length <= 1) return;
    const img = new window.Image();
    img.src = photos[(active + 1) % photos.length].src;
  }, [active, photos]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stageRef.current?.requestFullscreen?.();
  };

  const photo = photos[active];

  return (
    <div
      ref={stageRef}
      className={`relative w-full overflow-hidden bg-black select-none ${
        isFullscreen ? "h-screen" : "h-[70svh] md:h-[85vh]"
      }`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > SWIPE_PX) prev();
        if (dx < -SWIPE_PX) next();
        touchX.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="Project photos"
    >
      {/* Blurred fill behind the photo. */}
      <Image
        key={`bg-${photo.src}`}
        src={photo.src}
        alt=""
        fill
        sizes="40vw"
        className="object-cover scale-110 blur-2xl opacity-50 gallery-fade"
      />
      <Image
        key={photo.src}
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="object-contain gallery-fade"
      />

      <button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        className="btn btn-circle btn-md md:btn-lg absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 border-none text-white text-xl"
      >
        ❮
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next photo"
        className="btn btn-circle btn-md md:btn-lg absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 border-none text-white text-xl"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
        {active + 1} / {photos.length}
      </div>

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
        className="btn btn-circle btn-sm absolute top-4 right-4 bg-black/40 hover:bg-black/70 border-none text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          {isFullscreen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
          )}
        </svg>
      </button>
    </div>
  );
}
