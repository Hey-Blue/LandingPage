// MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div 
      className="w-screen h-[600px] bg-blue-50/50 animate-pulse flex items-center justify-center"
      style={{ 
        height: "600px",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="text-blue-500">Loading map...</div>
    </div>
  ),
});

const MapWrapper = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0">
        <Map />
      </div>
    </div>
  );
};

export default MapWrapper;