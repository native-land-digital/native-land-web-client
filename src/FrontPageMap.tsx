import { useCallback, useEffect, useState } from "react";
import {
  FillLayer,
  Layer,
  Map,
  MapLayerMouseEvent,
  Source,
} from "react-map-gl";
import { useSearchParams } from "react-router-dom";

import Box from "@mui/system/Box";

import DisclaimerNotice from "./DisclaimerNotice";
import MapLegend from "./MapLegend";

import "mapbox-gl/dist/mapbox-gl.css";

// for handling onHover feature highlights
const mapboxTerritoriesTilesetName =
  import.meta.env.VITE_TERRITORIES_TILESET_NAME ||
  import.meta.env.STORYBOOK_TERRITORIES_TILESET_NAME;
// VITE_ prefixed env vars: production, development
// STORYBOOK_ prefixed env vars: chromatic in CI & storybook
// VITE_ prefixed vars aren't available in storybook environment, see storybook docs

// template FillLayer to create highlight layers for hovered, selected, etc. without repeating code
const highlightLayerBase = {
  type: "fill" as FillLayer["type"],
  source: "",
  "source-layer": mapboxTerritoriesTilesetName, // the name of the source tileset hosted on Mapbox
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

const getRandomStartingCoordinates = () => {
  // not entirely sure why this is necessary
  // legacy code from the WordPress site
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

  //  get the latitude and longitude from the URL search params
  //    eg. http://native-land.ca/?longitude=-100.1953125&latitude=47.27922900257082
  //  this was instated for testing purposes, so that we could force a load of the map at a specific location
  const [searchParams] = useSearchParams();

  const longitudeParam = searchParams.get("longitude");
  const latitudeParam = searchParams.get("latitude");

  // get the starting position for the map.
  //   if the URL has a longitude and latitude, use that
  //   otherwise, use a random starting position
  const startingCoordinates =
    longitudeParam && latitudeParam
      ? {
          longitude: Number(longitudeParam),
          latitude: Number(latitudeParam),
          zoom: 2.5,
        }
      : getRandomStartingCoordinates();

  return (
    <>
      <Map
        mapboxAccessToken={
          import.meta.env.VITE_MAPBOX_TOKEN ||
          import.meta.env.STORYBOOK_MAPBOX_TOKEN
        }
        fog={{}} // defaults to starry background
        initialViewState={{
          ...startingCoordinates,
        }}
        interactiveLayerIds={["territories", mapboxTerritoriesTilesetName]}
        mapStyle={`mapbox://styles/nativeland/${
          import.meta.env.VITE_MAPBOX_STYLE ||
          import.meta.env.STORYBOOK_MAPBOX_STYLE
        }`}
        onClick={handleClick}
        onMouseMove={highlightPolygons}
        projection={{ name: "globe" }}
        style={{ height: `calc(100vh - ${navBarHeight})` }}
      >
        <Source
          type="vector"
          url={`mapbox://${import.meta.env.VITE_TERRITORIES_TILESET_URL || import.meta.env.STORYBOOK_TERRITORIES_TILESET_URL}`}
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
