import { useCallback, useState } from "react";
import { Layer, Map, MapLayerMouseEvent, Source } from "react-map-gl";
import type { FillLayer } from "react-map-gl";

import MapLegend from "./MapLegend";

import "mapbox-gl/dist/mapbox-gl.css";

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

export default function FrontPageMap({
  navBarHeight,
}: {
  navBarHeight: string;
}) {
  // const [hoveredFeatures, setHoveredFeatures] = useState<string[] | []>([]);
  const [hoveredFeatures, setHoveredFeatures] = useState<
    { name: string; id: string | number; slug: string }[] | []
  >([]);
  const [selectedFeatures, setSelectedFeatures] = useState<
    { name: string; id: string | number; slug: string }[] | []
  >([]); // features that user selects with click event

  // handler that highlights polygons if user hovers over them
  const highlightPolygons = useCallback((event: MapLayerMouseEvent): void => {
    const featuresUnderMouse =
      event.features && event.features.length > 0
        ? event.features.map((feature) => {
            // capture name, id, and slug so that <Feature> will have access to it in <MapLegend> links
            return {
              name: feature?.properties?.Name,
              id: feature?.properties?.id,
              slug: feature?.properties?.Slug,
            };
          })
        : [];

    setHoveredFeatures(featuresUnderMouse);
  }, []);

  const handleClick = useCallback(() => {
    setSelectedFeatures(hoveredFeatures); // an array of feature objects, eg. { id: 36082, name: Očhéthi Šakówiŋ, slug: oceti-sakowin-sioux }
  }, [hoveredFeatures]);

  const hoveredFeatureNames = hoveredFeatures.map((feature) => feature.name); // array of feature names for the hovered features' layer filter

  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5,
        }}
        interactiveLayerIds={["territories", "Territories_Live"]}
        mapStyle="mapbox://styles/nativeland/cl5sdtnnf000014mvdlefe0x9"
        onClick={handleClick}
        onMouseMove={highlightPolygons}
        style={{ height: `calc(100vh - ${navBarHeight})` }}
      >
        <Source
          type="vector"
          url="mapbox://nativeland.Territories_Live_tileset"
        >
          <Layer
            {...hoveredHighlightLayer}
            filter={["in", "Name", ...hoveredFeatureNames]}
          />
        </Source>
        <MapLegend selectedFeatures={selectedFeatures} />
      </Map>
    </>
  );
}
