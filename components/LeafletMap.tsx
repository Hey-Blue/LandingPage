"use client";
// @ts-nocheck
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ interactive = false, children }: { interactive?: boolean; children?: React.ReactNode }) {
  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      // Prevent moving the map: disable all interactive controls
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      boxZoom={false}
      touchZoom={false}
      keyboard={false}
      zoomControl={false}
      style={{
        height: '100%',
        width: '100%',
        // keep pointer events enabled so markers/children can still receive clicks
        pointerEvents: 'auto',
        backgroundColor: 'transparent',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & CARTO'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        opacity={0.35}
      />
      {children}
    </MapContainer>
  );
}
