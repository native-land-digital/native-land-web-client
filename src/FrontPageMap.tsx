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

  const getRandomStartingPosition = () => {
    if (window.innerWidth < 500) {
      return {
        longitude: -103.4216601,
        latitude: 49.2173029,
        zoom: 2,
      };
    }

    const startingPositions = [
      { longitude: -100.1953125, latitude: 47.27922900257082 },
      { longitude: 140.625, latitude: -27.68352808378776 },
      { longitude: -68.5546875, latitude: -19.973348786110602 },
    ];

    const randomIndex = Math.floor(Math.random() * startingPositions.length);

    return {
      ...startingPositions[randomIndex],
      zoom: 2.5,
    };
  };

  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        fog={{}} // defaults to starry background
        initialViewState={{
          ...getRandomStartingPosition(),
        }}
        interactiveLayerIds={["territories", "Territories_Live"]}
        mapStyle="mapbox://styles/nativeland/cl5sdtnnf000014mvdlefe0x9"
        onClick={handleClick}
        onMouseMove={highlightPolygons}
        projection={{ name: "globe" }}
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
      </Map>
      <MapLegend
        navBarHeight={navBarHeight}
        selectedFeatures={selectedFeatures}
      />
    </>
  );
}
