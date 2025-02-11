"use client"
import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = 180) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

export default function TermsPage() {
  const [consent, setConsent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setConsent(getCookie('hb_cookie_consent'));
  }, [])

  const openBanner = () => {
    if (typeof window !== 'undefined' && window.hbOpenCookieBanner) {
      window.hbOpenCookieBanner();
    }
  }

  const acceptAll = async () => {
    if (busy) return;
    setBusy(true);
    try {
      setCookie('hb_cookie_consent', 'accepted');
      setConsent('accepted');
      try { posthog.opt_in_capturing(); } catch {}
    } finally {
      setBusy(false);
    }
  }

  const rejectAll = async () => {
    if (busy) return;
    setBusy(true);
    try {
      setCookie('hb_cookie_consent', 'rejected');
      setConsent('rejected');
      try {
        posthog.opt_out_capturing();
        // Minimal, cookieless instance for anonymous counts
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
          capture_pageview: false,
          disable_persistence: true,
          autocapture: false,
          persistence: 'memory'
        });
      } catch {}
    } finally {
      setBusy(false);
    }
  }

  const statusLabel = consent === 'accepted' ? 'Accepted analytics' : consent === 'rejected' ? 'Rejected analytics' : 'No choice set';

  return (
    <div className="relative min-h-screen py-10">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">Effective as of May 9, 2024</p>

        {/* Manage Privacy Choices - visible to all users here */}
        <div className="mb-8 grid gap-3 justify-items-center">
          <div className="text-sm text-gray-700 dark:text-slate-300">
            Current choice: <span className="font-medium">{statusLabel}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={busy} onClick={acceptAll} className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-60">
              Accept Analytics
            </button>
            <button type="button" disabled={busy} onClick={rejectAll} className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-slate-600 bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-400 disabled:opacity-60">
              Reject
            </button>
            <button type="button" onClick={openBanner} className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-slate-500">
              Open Cookie Banner
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400">You can change this anytime here.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-white/15">
          <iframe
            src="https://utfs.io/f/xPb29TA7HRGZNHogjj2CL4FJj6ySPmTvxodwtKYGU7I2aEeB"
            className="w-full h-[800px]"
            title="Privacy Policy"
          />
        </div>
      </div>
    </div>
  )
}