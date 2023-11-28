// import { useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { useLoaderData } from "react-router-dom";

export default function Feature() {
  const { feature } = useLoaderData();

  console.log(feature);

  return (
    <Container component="main" maxWidth="lg">
      <Paper variant="outlined"></Paper>
    </Container>
  );
}
