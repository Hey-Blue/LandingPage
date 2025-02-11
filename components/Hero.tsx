"use client";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const MapWithConnections = dynamic(() => import("./MapWithConnections"), { ssr: false });

export default function Hero() {
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const showBgMap = (process.env.NEXT_PUBLIC_BG_MAP === '1' || (search?.get('bgMap') === '1'));
  return (
    // Use transparent background here so the layout's global gradient shows through
    <section className={`relative overflow-hidden` }>
  {showBgMap && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0">
    <MapWithConnections interactive={false} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-white/70" />
        </div>
      )}
      <div className="container-base py-16 lg:py-24 grid lg:grid-cols-2 items-center gap-10">
        <div className="fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-800 px-3 py-1 text-xs font-medium ring-1 ring-sky-200">Connection before correction</div>
          <h1 className="mt-4 text-4xl/tight sm:text-5xl/tight font-extrabold tracking-tight">
            <span className="block">Hey, Blue!</span>
            <span className="block mt-2">Building trust between <span className="text-brand">communities</span> and <span className="text-brand">police officers</span>.</span>
          </h1>
          <p className="mt-4 text-neutral-700 max-w-prose">A simple HELLO can change lives. Our app turns everyday connections into community impact through points, rewards, and local partnerships.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/app" className="btn btn-primary">Get the App</Link>
            <a href="#story" className="btn btn-outline">Our Story</a>
          </div>
        </div>
  <div className="relative flex items-center justify-center fade-in-up delay-1">
          <div className="relative size-[320px] sm:size-[380px] md:size-[440px] lg:size-[500px] rounded-full bg-sky-100 shadow-inner anim-float">
            <Image src="/assets/logo.png" alt="Hey, Blue! Logo" fill className="object-contain p-10" />
          </div>
  </div>
      </div>
    </section>
  );
}
