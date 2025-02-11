"use client";
import dynamic from "next/dynamic";
const MapWithConnections = dynamic(() => import("./MapWithConnections"), { ssr: false });

export default function USMap() {
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const showBottomMap = (process.env.NEXT_PUBLIC_BOTTOM_MAP === '1' || (search?.get('bottomMap') === '1'));
  if (!showBottomMap) return null;
  return (
    <section className="container-base py-16">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Where we connect</h2>
      <div className="map-container card">
        {/* Interactive map showing connection markers */}
        <MapWithConnections interactive />
      </div>
    </section>
  );
}
