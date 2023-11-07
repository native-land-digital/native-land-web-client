"use client";
import { useCallback, useState } from "react";
import { Layer, Map, MapLayerMouseEvent, Source } from "react-map-gl";
import type { FillLayer } from "react-map-gl";

const hoveredHighlightLayer: FillLayer = {
  id: "hovered-features",
  type: "fill",
  source: "",
  "source-layer": "Territories_Live",
  paint: {
    "fill-opacity": 0.3,
    "fill-outline-color": "#fff",
    "fill-color": "black",
  },
};

export default function FrontPageMap() {
  const [hoveredFeatures, setHoveredFeatures] = useState<string[] | []>([]);

  const highlightPolygons = useCallback((event: MapLayerMouseEvent): void => {
    const featuresUnderMouse = event.features || [];

    const featureNames =
      featuresUnderMouse.length > 0
        ? featuresUnderMouse.map((feature) => feature?.properties?.Name)
        : [];

    setHoveredFeatures(featureNames);
  }, []);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      interactiveLayerIds={["territories", "Territories_Live"]}
      mapStyle="mapbox://styles/nativeland/cl5sdtnnf000014mvdlefe0x9"
      onMouseMove={highlightPolygons}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Source type="vector" url="mapbox://nativeland.Territories_Live_tileset">
        <Layer
          {...hoveredHighlightLayer}
          filter={["in", "Name", ...hoveredFeatures]}
        />
      </Source>
    </Map>
  );
}
