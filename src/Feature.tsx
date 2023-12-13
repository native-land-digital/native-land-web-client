import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Map, MapRef, Layer, Source } from "react-map-gl";
import { decode } from "html-entities";

import InfoChip from "./InfoChip";
import ChangeLogTable from "./ChangeLogTable";

// TypeScript compiler can't find types for turf, and declares the error below
// seems like the fix will be included in an update by TurfJS team
// see https://github.com/Turfjs/turf/issues/2307
import bbox from "@turf/bbox";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";

export default function Feature() {
  const {
    feature: {
      polygon,
      polygon_style,
      category,
      name,
      wordpress_created_at,
      wordpress_last_modified_at,
      // sources,
      changelog,
      // official_websites,
    },
  } = useLoaderData() as { feature: NativeLandFeature };

  // once the map has rendered, zoom and pan to the feature's polygon
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
        <InfoChip
          category={category}
          infoChipType="category"
          wordpress_created_at={wordpress_created_at}
          wordpress_last_modified_at={wordpress_last_modified_at}
        />
        <InfoChip
          category={category}
          infoChipType="createdAt"
          wordpress_created_at={wordpress_created_at}
          wordpress_last_modified_at={wordpress_last_modified_at}
        />
        <InfoChip
          category={category}
          infoChipType="lastModified"
          wordpress_created_at={wordpress_created_at}
          wordpress_last_modified_at={wordpress_last_modified_at}
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
        {changelog && <ChangeLogTable changelog={changelog} />}
      </Paper>
    </Container>
  );
}
