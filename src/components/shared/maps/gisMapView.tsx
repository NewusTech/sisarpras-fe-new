"use client";

import React, { useState } from "react";
import { GoogleMap, Polygon, InfoWindow } from "@react-google-maps/api";
import { useGoogleMapsLoader } from "./gmapsLoader";
import type {
  FeatureCollection,
  Feature,
  Polygon as GeoJsonPolygon,
} from "geojson";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type AreaProperties = {
  id: number;
  name: string;
  color: string;
};

type GisMapViewProps = {
  geoJson: FeatureCollection<GeoJsonPolygon, AreaProperties>;
  children?: React.ReactNode;
};

export default function GisMapView({ geoJson, children }: GisMapViewProps) {
  const { isLoaded } = useGoogleMapsLoader();
  const [selected, setSelected] = useState<
    (AreaProperties & { position: google.maps.LatLngLiteral }) | null
  >(null);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full h-[600px]">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -3.2929468, lng: 103.8467967 }}
        zoom={13}
        options={{
          mapTypeId: "satellite",
          fullscreenControl: false,
        }}
      >
        {geoJson.features.map(
          (feature: Feature<GeoJsonPolygon, AreaProperties>) => {
            const coords = feature.geometry.coordinates[0].map(
              ([lng, lat]) => ({ lat, lng })
            );

            return (
              <Polygon
                key={feature.properties.id}
                paths={coords}
                options={{
                  fillColor: feature.properties.color,
                  fillOpacity: 0.35,
                  strokeColor: feature.properties.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
                onClick={(e) =>
                  setSelected({
                    ...feature.properties,
                    position: e.latLng
                      ? { lat: e.latLng.lat(), lng: e.latLng.lng() }
                      : coords[0],
                  })
                }
              />
            );
          }
        )}

        {selected && (
          <InfoWindow
            position={selected.position}
            onCloseClick={() => setSelected(null)}
          >
            <div className="text-sm">
              <p className="font-semibold">{selected.name}</p>
              <p className="text-gray-600">ID: {selected.id}</p>
            </div>
          </InfoWindow>
        )}

        {children}
      </GoogleMap>
    </div>
  );
}
