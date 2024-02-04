import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Map, MapRef, Layer, Source } from "react-map-gl";
import { decode } from "html-entities";

import InfoChip from "./InfoChip";
import ChangeLogTable from "./ChangeLogTable";
import WebsitesList from "./WebsitesList";

import bbox from "@turf/bbox";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { grey } from "@mui/material/colors";

// the polygon map goes to the edges of its <Container> everything else, header, text, links etc. is indented by this amount
// starts as number, gets translated into rem units in individual components
const xPadding = 2;

export default function Feature() {
  const {
    feature: {
      polygon,
      polygon_style,
      category,
      name,
      created_at,
      last_modified_at,
      // sources,
      changelog,
      official_websites,
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
    <Container
      component="main"
      sx={{ m: { xs: 0, lg: "auto" }, maxWidth: { xs: "100%", lg: "65rem" } }}
      disableGutters
    >
      <Paper
        elevation={5}
        sx={{ bgcolor: grey[800], my: { xs: 0, lg: 5 }, py: 3 }}
        square={false}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{
            color: "primary.contrastText",
            fontStyle: "italic",
            textAlign: { xs: "center", md: "left" },
            marginLeft: { xs: 0, md: xPadding + "rem" },
          }}
          gutterBottom
        >
          {decode(name)}
        </Typography>
        <Box
          sx={{
            marginLeft: { xs: 0, md: xPadding + "rem" },
            mb: 1.5,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <InfoChip category={category} infoChipType="category" />
          <InfoChip infoChipType="createdAt" created_at={created_at} />
          <InfoChip
            infoChipType="lastModified"
            last_modified_at={last_modified_at}
          />
        </Box>
        <Map
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
          onLoad={zoomToBounds}
          ref={mapRef}
          style={{ width: "100%", height: "30rem", marginBottom: "3rem" }}
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
        {official_websites?.length > 0 && (
          <WebsitesList
            official_websites={official_websites}
            xPadding={xPadding}
          />
        )}
        {changelog?.length > 0 && (
          <ChangeLogTable changelog={changelog} xPadding={xPadding} />
        )}
      </Paper>
    </Container>
  );
}
