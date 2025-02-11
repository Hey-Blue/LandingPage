"use client";
import React, { useEffect, useState } from "react";

export default function Story() {
  const images = [
    { url: "https://utfs.io/f/xPb29TA7HRGZfDo5ZRUXtyD8LoWCv1n7YE6ZM52gJQSbTaBc", alt: "Officer reading with kids" },
    { url: "https://utfs.io/f/xPb29TA7HRGZQtJUWV3fEJyDl4KCT95AqSx6wHbn1I2PW70m", alt: "Community event" },
    { url: "https://utfs.io/f/xPb29TA7HRGZ81gje84DDkyEAZRo1QjvBmgutPUx3NrX4bMJ", alt: "Classroom library" },
    { url: "https://utfs.io/f/xPb29TA7HRGZinicnIQd4je25EJPgKfnwhZYvTxQUraDGLOR", alt: "Officer with kids" },
  ];

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // keyboard controls for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i ?? 0) + 1 >= images.length ? 0 : (i ?? 0) + 1);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i ?? 0) - 1 < 0 ? images.length - 1 : (i ?? 0) - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

  return (
    <section id="story" className="container-base py-16 lg:py-24">
      <h2 className="text-3xl font-extrabold tracking-tight">Our Story</h2>

      {/* Masonry layout: visually balanced, scattered tiles */}
      <div className="mt-6 [column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 gap-4">
        {/* Text 1 */}
        <article className="mb-4 break-avoid card p-5">
          <h3 className="text-lg font-semibold mb-2">From HELLO to connection</h3>
          <p className="text-neutral-700 leading-7">When I became a Police Officer with the NYPD in 1997, I never realized the journey that I would embark upon. As the son of an NYPD officer, I felt the highs and lows of being part of a police family. My father loved the job. He was a mentor to many, and was definitely referred to as a "Cop's Cop." Being an officer was also a very traumatic experience for us both.</p>
          <p className="text-neutral-700 leading-7 mt-3">He said: “Yes my son. 5 letters will save your life… Just 5 Letters. H-E-L-L-O.” I said HELLO to EVERYONE. My perspective changed—from fear to confidence—and I began policing through a lens of self-reflection and service.</p>
        </article>

        {/* Image tiles */}
        <figure className="mb-4 break-avoid">
          <button className="block w-full" onClick={() => setLightbox(0)} aria-label="Expand image 1">
            <img src={images[0].url} alt={images[0].alt||''} loading="lazy" className="w-full h-auto rounded-xl border border-black/5 shadow-sm bg-white" />
          </button>
        </figure>

        <figure className="mb-4 break-avoid">
          <button className="block w-full" onClick={() => setLightbox(1)} aria-label="Expand image 2">
            <img src={images[1].url} alt={images[1].alt||''} loading="lazy" className="w-full h-auto rounded-xl border border-black/5 shadow-sm bg-white" />
          </button>
        </figure>

        {/* Pull quote */}
        <blockquote className="mb-4 break-avoid card p-5 text-brand">
          <p className="text-xl font-semibold leading-relaxed">Connection before correction.</p>
        </blockquote>

        <figure className="mb-4 break-avoid">
          <button className="block w-full" onClick={() => setLightbox(2)} aria-label="Expand image 3">
            <img src={images[2].url} alt={images[2].alt||''} loading="lazy" className="w-full h-auto rounded-xl border border-black/5 shadow-sm bg-white" />
          </button>
        </figure>

        {/* Dedication */}
        <article className="mb-4 break-avoid card p-5">
          <h3 className="text-lg font-semibold mb-2">Dedicated</h3>
          <p className="text-neutral-700 leading-7">This platform is dedicated to my father Michael A. Verdi Sr., to the community members who saved his life, to Jacqueline Phillips, and to every child I met while serving. I hope every officer gets to feel what I did. This is my HELLO. — JOHN VERDI</p>
        </article>

        <figure className="mb-4 break-avoid">
          <button className="block w-full" onClick={() => setLightbox(3)} aria-label="Expand image 4">
            <img src={images[3].url} alt={images[3].alt||''} loading="lazy" className="w-full h-auto rounded-xl border border-black/5 shadow-sm bg-white" />
          </button>
        </figure>

        {/* Why + Share */}
        <article className="mb-4 break-avoid card p-5">
          <h3 className="text-lg font-semibold mb-2">Why Hey, Blue!</h3>
          <ul className="list-disc pl-5 text-neutral-700 space-y-1">
            <li>Born from lived experience—community rebuilt me after 9/11.</li>
            <li>Connection before correction: relationships first, always.</li>
            <li>Programs that work: classroom readers, Plate Special dinners, and a gamified app that rewards positive interactions.</li>
          </ul>
          <div className="flex items-center gap-3 mt-3">
            <button
              className="btn btn-outline"
              onClick={async () => {
                const url = typeof window !== 'undefined' ? window.location.href : 'https://heyblue';
                const data = { title: 'Hey, Blue! Our Story', text: 'Connection before correction—learn our story.', url };
                if (navigator.share) { try { await navigator.share(data); return; } catch (e) {} }
                try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(()=>setCopied(false), 1500);} catch(e) {}
              }}
            >Share this</button>
            {copied && <span className="text-xs text-green-700">Link copied</span>}
          </div>
        </article>

        {/* Fast facts */}
        <article className="mb-4 break-avoid card p-5">
          <h3 className="text-lg font-semibold mb-2">Fast facts</h3>
          <ul className="text-sm text-neutral-700 grid grid-cols-2 gap-x-6 gap-y-2">
            <li>Started service: 1997, NYPD</li>
            <li>Core principle: “HELLO”</li>
            <li>Programs: Readers</li>
            <li>Plate Special dinners</li>
            <li>Gamified app</li>
            <li>Built with community</li>
          </ul>
        </article>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 btn btn-outline bg-white/90" onClick={(e) => { e.stopPropagation(); setLightbox(null); }} aria-label="Close">Close</button>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 text-3xl" onClick={(e) => { e.stopPropagation(); setLightbox((i) => i!==null ? (i + images.length - 1) % images.length : 0); }} aria-label="Previous">‹</button>
          <img src={images[lightbox].url} alt={images[lightbox].alt||''} className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 text-3xl" onClick={(e) => { e.stopPropagation(); setLightbox((i) => i!==null ? (i + 1) % images.length : 0); }} aria-label="Next">›</button>
        </div>
      )}
    </section>
  );
}
