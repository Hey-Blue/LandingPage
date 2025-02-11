"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const nav = (
    <nav className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
      <Link href="/" className="hover:opacity-80">Home</Link>
      <Link href="/team" className="hover:opacity-80">Team</Link>
      <Link href="/contact" className="hover:opacity-80">Contact</Link>
      <Link href="/blog" className="hover:opacity-80">Blog</Link>
      <Link href="/donate" className="hover:opacity-80">Donate</Link>
  <Link href="/tournament" className="hover:opacity-80">Tournament</Link>
      <Link href="/login" className="hover:opacity-80">Account</Link>
      <Link href="/app" className="btn btn-primary text-white">Get the App</Link>
    </nav>
  );

  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-sm border-b border-black/5 shadow-sm">
      <div className="container-base flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="Hey, Blue!" width={36} height={36} />
          <span className="font-semibold tracking-tight">Hey, Blue!</span>
        </Link>
        <button aria-label="Toggle menu" onClick={() => setOpen(v=>!v)} className="lg:hidden p-2 rounded-md border">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className="hidden lg:flex items-center gap-6">
          {nav}
          <ThemeToggle />
        </div>
      </div>
        {open && (
          <div className="lg:hidden border-t border-black/5 bg-white/70 backdrop-blur-sm">
            <div className="container-base py-4">{nav}</div>
            <div className="px-4 pb-4">
              <ThemeToggle />
            </div>
          </div>
        )}
    </header>
  );
}
