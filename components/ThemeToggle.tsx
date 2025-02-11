"use client";
import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "light" | "dark" | "system";

const LS_KEY = "heyblue:theme";

function getStoredMode(): Mode {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw as Mode;
  } catch {}
  return "system";
}

function prefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches || false;
}

export default function ThemeToggle() {
  // Keep SSR and first client render deterministic to avoid hydration mismatches
  const [mode, setMode] = useState<Mode>(getStoredMode);
  const [darkState, setDarkState] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const apply = (m: Mode) => {
      const useDark = m === "dark" || (m === "system" && prefersDark());
      document.documentElement.classList.toggle("dark", useDark);
      setDarkState(useDark ? true : false);
    };
    apply(mode);
    try { localStorage.setItem(LS_KEY, mode); } catch {}
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (mode === "system") apply("system"); };
    mq.addEventListener?.("change", onChange);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        setDarkState(document.documentElement.classList.contains('dark'));
      }
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) {
        // Another tab changed the theme; reflect it.
        const current = document.documentElement.classList.contains('dark');
        setDarkState(current);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('storage', onStorage);
    return () => {
      mq.removeEventListener?.("change", onChange);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('storage', onStorage);
    };
  }, [mode]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty("--x", `${x}px`);
    document.documentElement.style.setProperty("--y", `${y}px`);

    const nextDark = !darkState; // toggle between light/dark explicitly
    const setTheme = () => setMode(nextDark ? "dark" : "light");

    const anyDoc = document as any;
    if (anyDoc.startViewTransition) {
      anyDoc.startViewTransition(() => {
        setTheme();
      });
    } else {
      setTheme();
    }
  };

  return (
    <button
      aria-label="Toggle color theme"
      onClick={handleClick}
      title={mounted ? (darkState ? "Switch to light" : "Switch to dark") : "Toggle theme"}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-slate-800/80 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.05]"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className={`absolute w-5 h-5 text-amber-500 transition-all duration-500 ${mounted && darkState ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'}`} />
      <Moon className={`absolute w-5 h-5 text-sky-300 transition-all duration-500 ${mounted && darkState ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'}`} />
    </button>
  );
}
