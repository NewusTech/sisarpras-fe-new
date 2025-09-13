"use client";

import { getCoords } from "@/lib/utils";
import { GoogleMap, Polygon } from "@react-google-maps/api";
import type {
  Feature,
  FeatureCollection,
  Polygon as GeoJsonPolygon,
} from "geojson";
import React, { useState } from "react";
import { useGoogleMapsLoader } from "./gmapsLoader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type GisMapViewProps = {
  geoJson?: FeatureCollection<GeoJsonPolygon, AreaProperties>;
  children?: React.ReactNode;
  onSelected?: (data: AreaProperties) => void;
  selected?: AreaProperties;
  colorMap?: Record<string, string>;
  center?: google.maps.LatLngLiteral;
  handleClick?: (e: google.maps.MapMouseEvent) => void;
};

export default function GisMapView({
  geoJson,
  children,
  onSelected,
  colorMap,
  selected,
  center = { lat: -3.2929468, lng: 103.8467967 },
  handleClick,
}: GisMapViewProps) {
  const { isLoaded } = useGoogleMapsLoader();
  const [hovered, setHovered] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
        Loading map...
      </div>
    );
  }

  const getColor = (name: string): string => {
    // Saat ada hovered → highlight hanya polygon yg dihover, lainnya abu-abu
    if (hovered) {
      return hovered === name ? colorMap?.[name] || "#f59e0b" : "#00000055";
    }
    // Kalau tidak ada hovered → fallback ke logika selected
    if (!selected) return colorMap?.[name] || "#ccc";
    return selected.nm_kecamatan === name
      ? colorMap?.[name] || "#ccc"
      : "#00000055";
  };

  return (
    // <div className="w-full h-[600px]">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        fullscreenControl: false,
      }}
      onClick={handleClick}
    >
      {geoJson &&
        geoJson.features.map(
          (feature: Feature<GeoJsonPolygon, AreaProperties>) => {
            const coords = getCoords(feature);
            const name = feature.properties.nm_kecamatan;

            return (
              <Polygon
                key={feature.properties.kd_kecamatan}
                paths={coords}
                options={{
                  fillColor: getColor(name),
                  fillOpacity: 0.45,
                  strokeColor:
                    hovered === name ? colorMap?.[name] || "#f59e0b" : "#666",
                  strokeOpacity: 0.9,
                  strokeWeight: hovered === name ? 3 : 2,
                }}
                onClick={(e) => {
                  handleClick?.(e);
                  onSelected?.(feature.properties);
                }}
                onMouseOver={() => setHovered(name)}
                onMouseOut={() => setHovered(null)}
              />
            );
          }
        )}
      {children}
    </GoogleMap>
    // </div>
  );
}
