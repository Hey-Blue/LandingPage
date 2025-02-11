import Image from "next/image";

export type GalleryItem = { url: string; alt?: string; orientation?: 'square'|'portrait'|'landscape' };

export default function MediaGallery({ items }: { items: GalleryItem[] }) {
  return (
    <section className="container-base py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((it, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt={it.alt||""} className="h-full w-full object-cover"/>
          </div>
        ))}
      </div>
    </section>
  );
}
