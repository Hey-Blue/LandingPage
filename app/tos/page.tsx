"use client"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function TermsPage() {
  return (
    <div className="relative min-h-screen pt-20">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Terms of Service
          </h1>
          
          <div className="bg-white/90 dark:bg-slate-900/70 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
            <iframe
              src="https://utfs.io/f/xPb29TA7HRGZlazc4sL6m189ZwU2WESH4Fc0BbRgDn3YGIqa"
              className="w-full h-[800px]"
              title="Terms of Service"
            />
          </div>
        </div>
    </div>
  )
}