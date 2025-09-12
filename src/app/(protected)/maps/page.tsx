import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import GisMapView from "@/components/shared/maps/gisMapView";
import GoolePoint from "@/components/shared/maps/googlePoint";
import { FeatureCollection, Polygon } from "geojson";
import React from "react";

export default function Page() {
  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Dashboard",
            href: "/dashboard",
          },
          {
            title: "Maps View",
          },
        ]}
      />
      <GisMapView geoJson={dummyGeoJson}>
        <GoolePoint position={{ lat: -3.2909468, lng: 103.8467967 }}>
          <div className="max-w-lg">
            <p>Tes</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
              mollitia iusto explicabo ea pariatur cupiditate natus ut magni,
              saepe cum voluptatum maiores facere fugit eos voluptas? Excepturi
              minus veniam officiis.
            </p>
          </div>
        </GoolePoint>
      </GisMapView>
    </div>
  );
}

type AreaProperties = {
  id: number;
  name: string;
  color: string;
};

const dummyGeoJson: FeatureCollection<Polygon, AreaProperties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 1,
        name: "Area Hutan Lindung",
        color: "#4CAF50",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [103.8467967, -3.2909468],
            [103.8567967, -3.2919468],
            [103.8567967, -3.2959468],
            [103.8467967, -3.2969468],
            [103.8467967, -3.2909468], // polygon harus closed
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: 2,
        name: "Area Pemukiman",
        color: "#FF5722",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [103.8467967, -3.3009468],
            [103.8567967, -3.3019468],
            [103.8567967, -3.3059468],
            [103.8467967, -3.3069468],
            [103.8467967, -3.3009468],
          ],
        ],
      },
    },
  ],
};
