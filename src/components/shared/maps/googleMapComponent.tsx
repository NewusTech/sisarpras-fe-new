"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { FeatureCollection, Polygon as GeoJsonPolygon } from "geojson";
import { useCallback } from "react";
import GisMapView from "./gisMapView";
import { useGoogleMapsLoader } from "./gmapsLoader";
import GoogleCurrentLocationButton from "./googleCurrentLocationButton";
import GoogleMapSearchBox from "./googleMapsSearchBox";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type GoogleMapComponentProps = {
  position: [number, number];
  geoJson?: FeatureCollection<GeoJsonPolygon, AreaProperties>;
  onPositionChange?: (newPosition: [number, number]) => void;
};

export default function GoogleMapComponent({
  position,
  onPositionChange,
  geoJson,
}: GoogleMapComponentProps) {
  const { isLoaded } = useGoogleMapsLoader();

  const handleClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      onPositionChange?.([lat, lng]);
    },
    [onPositionChange]
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Komponen Search dipisah */}
      <GoogleMapSearchBox
        onPlaceSelected={(lat, lng) => onPositionChange?.([lat, lng])}
      />
      <GisMapView
        geoJson={geoJson}
        center={{ lat: position[0], lng: position[1] }}
        handleClick={handleClick}
      >
        <Marker position={{ lat: position[0], lng: position[1] }} />
      </GisMapView>
      <div className="absolute bottom-7 right-20 z-[999]">
        <GoogleCurrentLocationButton
          onLocationSuccess={(val) => onPositionChange?.(val)}
        />
      </div>
    </div>
  );
}
