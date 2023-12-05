import { useLoaderData } from "react-router-dom";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
  const { feature } = useLoaderData() as { feature: NativeLandFeature };

  const chipLabel = getChipLabel(feature.category);

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={5}
        sx={{ bgcolor: grey[800], px: 2, py: 3, mt: "2rem" }}
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
          {feature.name}
        </Typography>
        <Chip
          color="primary"
          icon={<LandscapeIcon />}
          sx={{ mb: "1rem", ml: "1rem", px: "1rem" }}
          label={chipLabel}
        />
        <Divider variant="middle" />
      </Paper>
    </Container>
  );
}
