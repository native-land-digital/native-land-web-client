import { useCallback, useEffect, useState } from "react";
import {
  FillLayer,
  Layer,
  Map,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl";

import Box from "@mui/system/Box";

import DisclaimerNotice from "./DisclaimerNotice";
import MapLegend from "./MapLegend";

import "mapbox-gl/dist/mapbox-gl.css";

// template FillLayer to create highlight layers for hovered, selected, etc. without repeating code
const highlightLayerBase = {
  type: "fill" as FillLayer["type"],
  source: "",
  "source-layer": "Territories_Live", // the name of the source tileset hosted on Mapbox
};

// styling for hovered features
const hoveredHighlightLayer: FillLayer = {
  ...highlightLayerBase,
  id: "hovered-features",
  paint: {
    "fill-opacity": 0.8,
    "fill-outline-color": "blue",
    "fill-color": "white",
  },
};

const selectedHighlightLayer: FillLayer = {
  ...highlightLayerBase,
  id: "selected-features",
  paint: {
    "fill-opacity": 0.8,
    "fill-outline-color": "white",
    "fill-color": "blue",
  },
};

// get starting position of map on initial pageload
const startingPositions = [
  { longitude: -100.1953125, latitude: 47.27922900257082 }, // north dakota, USA
  { longitude: 140.625, latitude: -27.68352808378776 }, // south australia
  { longitude: -68.5546875, latitude: -19.973348786110602 }, // pica, chile
];

const getRandomStartingPosition = () => {
  if (window.innerWidth < 500) {
    return {
      longitude: -103.4216601,
      latitude: 49.2173029,
      zoom: 2,
    };
  }

  const randomIndex = Math.floor(Math.random() * startingPositions.length);

  return {
    ...startingPositions[randomIndex],
    zoom: 2.5,
  };
};

// flattens an array of FrontPageMapFeature into an array of feature.names
// this is so we can run a Mapbox GL "in" filter on these names, which AFAIK needs to be a an array of strings
const getFeatureNames = (features: FrontPageMapFeature[]) =>
  features.map((feature) => feature.name);

export default function FrontPageMap({
  navBarHeight,
}: {
  navBarHeight: string;
}) {
  const [hoveredFeatures, setHoveredFeatures] = useState<
    FrontPageMapFeature[] | []
  >([]); // features highlighted onMouse movements

  const [selectedFeatures, setSelectedFeatures] = useState<
    FrontPageMapFeature[] | []
  >([]); // features that user selects with click event

  const [isDisclaimerDisplayed, setDisclaimerDisplay] = useState(false);

  //  user sees disclaimer notice in very first page visit:
  //    "This map does not represent or intend to represent official or legal boundaries of any Indigenous nations."
  //  if user closes disclaimer, this display state is persisted to localStorage, ie. they only see it once
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

  const hoveredFeatureNames = getFeatureNames(hoveredFeatures); // array of feature names for the hovered features' layer filter
  const selectedFeatureNames = getFeatureNames(selectedFeatures);

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
            {...selectedHighlightLayer}
            filter={["in", "Name", ...selectedFeatureNames]}
          />
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
