"use client";

import { InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";

type PointProps = {
  position: google.maps.LatLngLiteral;
  children?: React.ReactNode;
};

export default function GoolePoint({ position, children }: PointProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Marker position={position} onClick={() => setOpen(true)} />
      {open && (
        <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
          {children}
        </InfoWindow>
      )}
    </>
  );
}
