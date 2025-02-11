"use client";
import { useMemo } from "react";
import { timelineEvents } from "@/data/timeline";

import { useEffect, useRef, useState } from "react";

function SmartImage({ url, alt }: { url: string; alt?: string }) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [mode, setMode] = useState<'cover'|'contain'>('cover');
  const [h, setH] = useState(192); // default 48 * 4px
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const landscape = img.width >= img.height;
      setMode(landscape ? 'cover' : 'contain');
      setH(landscape ? 192 : 280);
    };
    img.src = url;
  }, [url]);
  return (
    <img ref={ref} src={url} alt={alt||''} style={{height: h}} className={`w-full ${mode==='cover' ? 'object-cover' : 'object-contain bg-white'} rounded-lg`} />
  );
}

function Media({ m }: { m: any }) {
  if (m.type === 'image') return <SmartImage url={m.url} alt={m.alt} />;
  if (m.type === 'youtube') return (
    <div className="relative w-full" style={{paddingTop:'56.25%'}}>
      <iframe loading="lazy" className="absolute inset-0 h-full w-full rounded-lg" src={`https://www.youtube.com/embed/${m.embedId}`} title={m.alt||'YouTube video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
    </div>
  );
  if (m.type === 'instagram') return (
    <iframe loading="lazy" className="w-full rounded-lg" style={{height: 500}} src={`https://www.instagram.com/p/${m.instagramId}/embed`} allow="clipboard-write; encrypted-media; picture-in-picture; web-share" />
  );
  if (m.type === 'nbcnews') return (
    <div className="relative w-full" style={{paddingTop:'56.25%'}}>
      <iframe
        className="absolute inset-0 h-full w-full rounded-lg"
        loading="lazy"
        src={`https://www.nbcnews.com/news/embedded-video/${m.videoId}`}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
  if (m.type === 'pdf') return (
    <iframe loading="lazy" className="w-full h-64 rounded-lg bg-white" src={m.url} title={m.alt||m.title||'Document'} />
  );
  return null;
}

export default function Timeline() {
  // Render newest events first: copy and reverse the source array to avoid mutating it
  const items = useMemo(() => [...timelineEvents].reverse(), []);
  return (
    <section className="container-base py-20">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight">Our Timeline</h2>
        <div className="text-xs text-neutral-500 dark:text-slate-300">Swipe →</div>
      </div>
  <div className="relative pt-6 overflow-visible">
        <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 rounded-full dark:from-sky-700/40 dark:via-sky-500/50 dark:to-sky-700/40" />
        <div className="relative overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar-x">
          <ol className="flex gap-6 min-w-max px-1">
            {items.map((e, idx) => (
              <li key={`${e.date}-${idx}`} className="group w-[340px] shrink-0 snap-start fade-in-up">
        <div className="h-4 w-4 rounded-full bg-brand mx-auto mb-3 shadow ring-4 ring-white dark:ring-slate-800 translate-y-0" />
                <div className="card p-4 hover:shadow-md transition-shadow duration-300">
                  <time className="text-xs font-medium text-sky-700 dark:text-sky-300">{e.date}</time>
                  <h3 className="text-lg font-semibold mt-1">{e.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-sky-300 mt-1">{e.description}</p>
                  {e.media && e.media.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {e.media.slice(0,2).map((m: any, i: number) => (
                        <Media key={i} m={m} />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
