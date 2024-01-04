import { useCallback, useEffect, useState } from "react";
import { Layer, Map, MapLayerMouseEvent, Source } from "react-map-gl";
import type { FillLayer } from "react-map-gl";

import Box from "@mui/system/Box";

import DisclaimerNotice from "./DisclaimerNotice";
import MapLegend from "./MapLegend";

import "mapbox-gl/dist/mapbox-gl.css";

// styling for hovered features
const hoveredHighlightLayer: FillLayer = {
  id: "hovered-features",
  type: "fill",
  source: "",
  "source-layer": "Territories_Live", // the name of the source tileset hosted on Mapbox
  paint: {
    "fill-opacity": 0.5,
    "fill-outline-color": "black",
    "fill-color": "white",
  },
};

export default function FrontPageMap({
  navBarHeight,
}: {
  navBarHeight: string;
}) {
  const [hoveredFeatures, setHoveredFeatures] = useState<
    { name: string; id: string | number; slug: string }[] | []
  >([]);

  // features that user selects with click event
  const [selectedFeatures, setSelectedFeatures] = useState<
    { name: string; id: string | number; slug: string }[] | []
  >([]);

  const [isDisclaimerDisplayed, setDisclaimerDisplay] = useState(false);

  useEffect(() => {
    const cookie = localStorage.getItem("isDisclaimerClosed");
    if (cookie === null) {
      setDisclaimerDisplay(true);
    }
  }, []);

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
      <Box
        sx={{
          position: "absolute",
          top: `calc(${navBarHeight} + 1rem)`,
          left: "1rem",
          width: "25rem",
          opacity: 0.9,
        }}
      >
        {isDisclaimerDisplayed && (
          <DisclaimerNotice setDisclaimerDisplay={setDisclaimerDisplay} />
        )}
        <MapLegend selectedFeatures={selectedFeatures} />
      </Box>
    </>
  );
}
