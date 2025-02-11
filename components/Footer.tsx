"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [platform, setPlatform] = useState<"ios"|"android"|"web">("web");

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setPlatform("ios");
    else if (/android/.test(ua)) setPlatform("android");
  }, []);

  const getStoreLink = () => {
    if (platform === 'ios') {
      return 'https://apps.apple.com/us/app/hey-blue/id6499293126';
    } else if (platform === 'android') {
      return 'https://play.google.com/store/apps/details?id=com.development.heyblue&hl=en_US';
    }
    return '/app';
  };

  return (
  <footer className="mt-24 border-t border-black/5 bg-white/90">
      <div className="container-base py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h4 className="font-semibold mb-2">Hey, Blue!</h4>
          <p className="text-sm text-gray-700 max-w-xs">Connection before correction. Building trust between communities and police officers, one HELLO at a time.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/team" className="hover:underline">Team</Link></li>
            <li><Link href="/donate" className="hover:underline">Donate</Link></li>
            <li><Link href="/tournament" className="hover:underline">Tournament</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link href="/tos" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Get the App</h4>
          <a href={getStoreLink()} className="btn btn-primary">Open Store</a>
          <div className="mt-4 socials socials--icons">
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/itsheyblue/" aria-label="Facebook" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H8.08v-2.91h2.36V9.41c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.53.72-1.53 1.46v1.76h2.6l-.42 2.91h-2.18V22c4.78-.79 8.44-4.94 8.44-9.94Z"/></svg>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/itsheyblue/" aria-label="Instagram" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/hey-blue/posts/?feedView=all" aria-label="LinkedIn" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7 0h3.84v1.97h.05C12.22 9.06 13.9 8 16.2 8c3.66 0 4.34 2.12 4.34 4.88V23h-4v-6.7c0-1.6-.03-3.66-2.23-3.66-2.24 0-2.58 1.74-2.58 3.54V23h-4V8.5Z"/></svg>
            </a>
            <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCy_HUKew4Ru65ELktskkWJA" aria-label="YouTube" title="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.01 3.01 0 0 0-2.12-2.13C19.58 3.5 12 3.5 12 3.5s-7.58 0-9.38.57A3.01 3.01 0 0 0 .5 6.2 45.2 45.2 0 0 0 0 12a45.2 45.2 0 0 0 .62 5.8 3.01 3.01 0 0 0 2.12 2.13C4.54 20.5 12 20.5 12 20.5s7.58 0 9.38-.57a3.01 3.01 0 0 0 2.12-2.13A45.2 45.2 0 0 0 24 12a45.2 45.2 0 0 0-.5-5.8ZM9.75 15.5v-7l6 3.5-6 3.5Z"/></svg>
            </a>
          </div>
        </div>
      </div>
  <div className="py-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} Hey, Blue! All rights reserved.</div>
    </footer>
  );
}
