import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import type { Feature } from "geojson";

import { useLoaderData } from "react-router-dom";

export default function Feature() {
  const { feature } = useLoaderData() as { feature: NativeLandFeature };

  console.log(feature);

  return (
    <Container component="main" maxWidth="lg">
      <Paper variant="outlined"></Paper>
    </Container>
  );
}
