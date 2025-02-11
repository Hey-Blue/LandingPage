'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Icon, } from 'leaflet';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { motion } from 'framer-motion';
import { Map as LeafletMap } from 'leaflet';
import Link from 'next/link';
import {Counter} from './Counter';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface Connection {
  position: {
    lat: number;
    lng: number;
  };
  officerName: string;
  memberName: string;
  time: Date;
  visible?: boolean;
}

interface LocationData {
  latitude: number;
  longitude: number;
}

interface FirestoreConnectionData {
  location: LocationData[];
  policeOfficerName: string[];
  communityMemberName: string[];
  connectionTimes: Timestamp[];
}

const Map = () => {
  const [mapRef, setMapRef] = useState<LeafletMap | null>(null);
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [visibleMarkers, setVisibleMarkers] = useState<number[]>([]);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  

  useEffect(() => {
    const fetchConnections = async () => {
      const connectionsRef = collection(db, 'connection');
      const snapshot = await getDocs(connectionsRef);
      const connectionData: Connection[] = [];
      
      snapshot.forEach(doc => {
        const data = doc.data() as FirestoreConnectionData;
        
        // Validate data structure
        if (!Array.isArray(data.location) || !Array.isArray(data.policeOfficerName) || 
            !Array.isArray(data.communityMemberName) || !Array.isArray(data.connectionTimes)) {
          console.error('Invalid document structure:', doc.id);
          return;
        }
        
        data.location.forEach((loc: LocationData, index: number) => {
          if (typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number') {
            console.error('Invalid location data:', loc);
            return;
          }
          
          const connection: Connection = {
            position: {
              lat: loc.latitude,
              lng: loc.longitude
            },
            officerName: data.policeOfficerName[index],
            memberName: data.communityMemberName[index],
            time: data.connectionTimes[index].toDate(),
            visible: false
          };
          
          connectionData.push(connection);
        });
      });
      
      setConnections(connectionData);
      setVisibleMarkers(connectionData.map((_, index) => index));
    };

    fetchConnections();
  }, []);

  useEffect(() => {
    if (isMobile && mapRef && connections.length > 0 && visibleMarkers.length > 0) {
      const interval = setInterval(() => {
        const nextIndex = (currentMarkerIndex + 1) % connections.length;
        const marker = connections[nextIndex];
        
        const offsetLat = marker.position.lat + 0.3;
        
        mapRef.flyTo(
          [offsetLat, marker.position.lng],
          10, 
          {
            duration: 1.5, 
            easeLinearity: 0.3, 
          }
        );
        
        setCurrentMarkerIndex(nextIndex);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentMarkerIndex, mapRef, connections, visibleMarkers, isMobile]);

  useEffect(() => {
    // Cleanup function for markers
    return () => {
      setVisibleMarkers([]);
      setConnections([]);
    };
  }, []);

  const handleMapLoad = (map: LeafletMap) => {
    setMapRef(map);

    if (map && map.getPane('tilePane')) {
      const tilePane = map.getPane('tilePane');
      if (tilePane) {
        tilePane.style.opacity = '1';
        tilePane.style.willChange = 'transform';
      }
    }
  };

  const mapStyles = { 
    height: "700px",
    width: "100vw",
    maxWidth: "100%",
    filter: "saturate(1.3) contrast(1.2)", 
    imageRendering: "auto" as 'auto'
  };

  const customIcon = new Icon({
    iconUrl: '/assets/logo.png',
    iconSize: isMobile ? [24, 24] : [34, 34],
    iconAnchor: isMobile ? [12, 24] : [17, 34],
    popupAnchor: [0, -34],
  });

  const defaultCenter: [number, number] = [39.8283, -98.5795]; 
  const defaultZoom = isMobile ? 9 : 5; 

  return (
    <div className="w-screen overflow-hidden relative">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-gray-700 uppercase tracking-wider text-2xl font-bold mb-1">
            Positive Social Interactions
          </span>
          <span className="text-4xl font-bold text-blue-600">
          </span>
          <Counter value={connections.length} />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="/donate">
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full 
                       shadow-lg font-medium tracking-wide transition-colors duration-200
                       backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Support Our Mission
          </motion.button>
        </Link>
      </div>

      <MapContainer
        ref={(map) => { if (map) setMapRef(map); }}
        center={defaultCenter}
        zoom={defaultZoom}
        style={mapStyles}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={true}
        keyboard={false}
        touchZoom={false}
        className="rounded-lg shadow-xl"
        whenReady={() => handleMapLoad(mapRef as LeafletMap)} 
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          minZoom={isMobile ? 9 : 5}
          maxZoom={12}
          subdomains={'abcd'}
          tileSize={256}
        />
        {connections.map((connection, index) => (
          visibleMarkers.includes(index) ? (
            <Marker
              key={`marker-${index}`}
              position={[connection.position.lat, connection.position.lng]}
              icon={customIcon}
              opacity={1}
              interactive={false}
            />
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;