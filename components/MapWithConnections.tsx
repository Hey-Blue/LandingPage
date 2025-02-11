"use client";
// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { createClient as createSupabaseClient } from "@/utils/supabase/client";
import L from "leaflet";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

type Connection = {
  id: string | number;
  time: Date | null;
  position: { lat: number; lng: number };
};

// Load logo from public/assets/logo.png as marker icon
const logoIcon = new L.Icon({
  iconUrl: "/assets/logo.png",
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  className: "hb-marker",
});

export default function MapWithConnections({ interactive = true }: { interactive?: boolean }) {
  const [conns, setConns] = useState<Connection[]>([]);

  // Runtime toggle sources: env and query params
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const showBgMap = (process.env.NEXT_PUBLIC_BG_MAP === '1' || (search?.get('bgMap') === '1'));
  const showBottomMap = (process.env.NEXT_PUBLIC_BOTTOM_MAP === '1' || (search?.get('bottomMap') === '1'));

  useEffect(() => {
    const supabase = createSupabaseClient();
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from('connections')
        .select('id, connected_at, connection_latitude, connection_longitude')
        .limit(1000);
      if (error) { console.error('Supabase fetch error:', error.message); return; }
      if (!mounted) return;
      const mapped: Connection[] = (data||[])
        .filter((r: any) => typeof r.connection_latitude === 'number' && typeof r.connection_longitude === 'number')
        .map((r: any) => ({ id: r.id, time: r.connected_at ? new Date(r.connected_at) : null, position: { lat: r.connection_latitude, lng: r.connection_longitude } }));
      setConns(mapped);
    })();
    return () => { mounted = false; };
  }, []);

  // If we're used as background but toggles are off, render nothing.
  if (!interactive && !showBgMap) return null;
  if (interactive && !showBottomMap) return null;

  return (
    <LeafletMap interactive={interactive}>
      {conns.map((c) => (
        <RLMarker key={c.id} position={[c.position.lat, c.position.lng]} icon={logoIcon} />
      ))}
    </LeafletMap>
  );
}

function RLMarker(props: any) {
  const [Comp, setComp] = useState<any>(null);
  useEffect(() => {
    (async () => {
      // Import entire react-leaflet and grab Marker at runtime
      const mod: any = await import('react-leaflet');
      setComp(() => mod.Marker);
    })();
  }, []);
  if (!Comp) return null;
  return <Comp {...props} />;
}
