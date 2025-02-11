"use client"

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubscribeForm from "@/components/SubscribeForm";

const STORAGE_KEY = "hb:first-visit-subscribed-or-dismissed";

export default function FirstVisitPopup() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    // Show after a short delay if not previously dismissed
    try {
      const seen = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        const t = setTimeout(() => setOpen(true), 1000);
        return () => clearTimeout(t);
      }
    } catch (_) {
      // ignore storage errors
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch (_) {}
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => (!val ? handleClose() : setOpen(val))}>
  <DialogContent className="bg-white p-0 overflow-hidden dark:bg-[#0a1f3d]">
  <div className="bg-gradient-to-br from-sky-50 to-white border-b border-sky-100 p-6 rounded-t-2xl dark:bg-none dark:bg-[rgba(5,18,45,0.98)] dark:border-[rgba(173,197,255,0.2)]">
          <DialogHeader>
      <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-[#eaf2ff]">Welcome! Stay in the loop</DialogTitle>
      <DialogDescription className="text-neutral-600 dark:text-[#c9dbff]">
              Join our newsletter to get the latest updates and announcements.
            </DialogDescription>
          </DialogHeader>
        </div>
  <div className="p-6 bg-white dark:bg-[rgba(6,23,61,0.92)]">
          <SubscribeForm onSuccess={handleClose} compact buttonStyle="site" />
          <button
      className="mt-3 text-xs text-neutral-500 underline dark:text-[#c9dbff]"
            type="button"
            onClick={handleClose}
          >
            No thanks
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
