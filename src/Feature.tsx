import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Map, MapRef, Layer, Source } from "react-map-gl";
import bbox from "@turf/bbox";
import { decode } from "html-entities";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import LandscapeIcon from "@mui/icons-material/Landscape";

import { grey } from "@mui/material/colors";

const getChipLabel = (category: string) => {
  switch (category) {
    case "territories":
      return "Territory";

    case "languages":
      return "Language";

    case "treaties":
      return "Treaty";
  }
};

export default function Feature() {
  const {
    feature: { polygon, polygon_style, category, name },
  } = useLoaderData() as { feature: NativeLandFeature };

  console.log(polygon_style);

  const mapRef = useRef<MapRef>(null);

  const zoomToBounds = () => {
    const [minLng, minLat, maxLng, maxLat] = bbox(polygon);

    mapRef?.current?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 40, duration: 1000 }
    );
  };

  const chipLabel = getChipLabel(category);

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={5}
        sx={{ bgcolor: grey[800], px: 2, py: 3, my: "2rem" }}
        square
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            color: "primary.contrastText",
            fontStyle: "italic",
            ml: "1rem",
          }}
          gutterBottom
        >
          {decode(name)}
        </Typography>
        <Chip
          color="primary"
          icon={<LandscapeIcon />}
          sx={{ mb: "1rem", ml: "1rem", px: "1rem" }}
          label={chipLabel}
        />
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
          onLoad={zoomToBounds}
          ref={mapRef}
          style={{ width: "400px", height: "400px" }}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
        >
          <Source type="geojson" data={polygon}>
            <Layer
              id="feature-polygon"
              type="fill"
              paint={{
                "fill-color": polygon_style.color,
                "fill-opacity": 0.75,
              }}
            />
          </Source>
        </Map>
      </Paper>
    </Container>
  );
}
