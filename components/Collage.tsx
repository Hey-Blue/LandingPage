type Item = { url: string; alt?: string };

export default function Collage({ items, className = "", rowHeight = 140 }: { items: Item[]; className?: string; rowHeight?: number }) {
  const shown = items.slice(0, 10);
  const colSpans = [3, 3, 4, 5, 3, 4, 5, 3, 4, 5];
  const rowSpans = [2, 2, 3, 3, 2, 2, 3, 2, 2, 3];
  return (
    <div className={`grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-3 ${className}`} style={{ gridAutoRows: `${rowHeight}px` }}>
      {shown.map((it, i) => {
        const spanCols = colSpans[i % colSpans.length];
        const spanRows = rowSpans[i % rowSpans.length];
        return (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl shadow-sm bg-white/70 border border-black/5"
            style={{ gridColumn: `span ${spanCols} / span ${spanCols}`, gridRow: `span ${spanRows} / span ${spanRows}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.url} alt={it.alt || ''} className="h-full w-full object-cover" />
          </div>
        );
      })}
    </div>
  );
}
