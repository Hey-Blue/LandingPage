"use client";
import React, { useEffect, useState } from 'react';
import posthog from 'posthog-js';

declare global {
  interface Window {
    hbOpenCookieBanner?: () => void;
  }
}

const CONSENT_COOKIE = 'hb_cookie_consent';
const THEME_LS_KEY = 'heyblue:theme';

type Mode = 'light' | 'dark' | 'system';

function getStoredThemeMode(): Mode {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(THEME_LS_KEY) : null;
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw as Mode;
  } catch {}
  return 'system';
}

function prefersDark(): boolean {
  try {
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
  } catch { return false; }
}

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 180) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; Expires=' + expires + '; Path=/; SameSite=Lax';
}

export const CookieConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [regulated, setRegulated] = useState(false);
  const [override, setOverride] = useState(false);
  const [busy, setBusy] = useState(false);
  // resolvedDark is the banner's internal decision for dark-mode styling
  const [resolvedDark, setResolvedDark] = useState<boolean>(() => prefersDark());

  useEffect(() => {
    const existing = getCookie(CONSENT_COOKIE);
    const regFlag = getCookie('hb_reg') === '1';
    // Treat obvious local/dev hosts as "regulated" so the banner appears when
    // middleware geo headers aren't available (dev server, local preview).
    const isLocalHost = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local')
    );

    const effectiveRegulated = regFlag || isLocalHost;
    setRegulated(effectiveRegulated);
    if (!existing && effectiveRegulated) {
      setOpen(true);
    }

    // Compute resolved theme for banner and keep it synced with storage and
    // document class changes so the banner matches the user's site preference.
    const updateResolvedDark = () => {
      try {
        const stored = getStoredThemeMode();
        const docIsDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
        const useDark = stored === 'dark' || (stored === 'system' && docIsDark);
        setResolvedDark(useDark);
      } catch { /* ignore */ }
    };

    updateResolvedDark();

    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === THEME_LS_KEY) updateResolvedDark();
    };
    window.addEventListener('storage', onStorage);

    // Observe documentElement class changes (theme toggles affect class list)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && (m as any).attributeName === 'class') {
          updateResolvedDark();
          break;
        }
      }
    });
    if (typeof document !== 'undefined') {
      mo.observe(document.documentElement, { attributes: true });
    }

    return () => {
      window.removeEventListener('storage', onStorage);
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    window.hbOpenCookieBanner = () => {
      setOverride(true);
      setOpen(true);
    };
    return () => {
      if (window.hbOpenCookieBanner) {
        delete window.hbOpenCookieBanner;
      }
    };
  }, []);

  const acceptAll = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (busy) return;
    setBusy(true);
    // Persist choice immediately
    try { setCookie(CONSENT_COOKIE, 'accepted'); } catch {}
    // Delay close slightly to avoid click-through on underlying elements
    setTimeout(() => {
      setOpen(false);
      try { posthog.opt_in_capturing(); } catch {}
      setBusy(false);
    }, 120);
  };

  const rejectAll = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (busy) return;
    setBusy(true);
    try { setCookie(CONSENT_COOKIE, 'rejected'); } catch {}
    setTimeout(() => {
      setOpen(false);
      try {
        posthog.opt_out_capturing();
        // Initialize a minimal, cookieless instance for anonymous counts
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
          capture_pageview: false,
          disable_persistence: true,
          autocapture: false,
          persistence: 'memory'
        });
      } catch {}
      setBusy(false);
    }, 120);
  };

  if (!open || (!regulated && !override)) return null;

  const containerThemeClasses = resolvedDark
    ? 'bg-slate-900/90 border-white/15 text-slate-300'
    : 'bg-white border-gray-200 text-gray-900';

  const acceptBtnTheme = resolvedDark
    ? 'bg-blue-500 hover:bg-blue-400 dark:focus:ring-slate-400'
    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400';

  const rejectBtnTheme = resolvedDark
    ? 'bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600'
    : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200';

  const subtleText = resolvedDark ? 'text-slate-400' : 'text-gray-500';

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-6 sm:px-6" onMouseDown={(e) => e.stopPropagation()}>
      <div className={`mx-auto max-w-4xl rounded-2xl ${containerThemeClasses} shadow-2xl p-6`} role="dialog" aria-live="polite">
        <h2 className="text-lg font-semibold mb-2">Your Privacy Matters</h2>
        <p className={`text-sm leading-relaxed mb-4 ${resolvedDark ? 'text-slate-300' : 'text-gray-700'}`}>
          We use only essential cookies unless you allow additional analytics. We do not sell your data. If you accept, we
          use analytics to understand feature usage and find bugs. If you reject, we still collect minimal, cookieless, anonymized
          interaction counts (no personal identifiers) to maintain site reliability.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" disabled={busy} onClick={(e) => acceptAll(e)} className={`px-5 py-2.5 rounded-lg text-white text-sm font-medium shadow focus:outline-none focus:ring-2 disabled:opacity-60 ${acceptBtnTheme}`}>Accept Analytics</button>
          <button type="button" disabled={busy} onClick={(e) => rejectAll(e)} className={`px-5 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 disabled:opacity-60 ${rejectBtnTheme}`}>Reject</button>
        </div>
        <p className={`mt-3 text-xs ${subtleText}`}>
          You can change your choice anytime here or on the Privacy Policy page.
        </p>
      </div>
    </div>
  );
};