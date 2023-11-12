import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MapLegend({
  selectedFeatures,
}: {
  selectedFeatures: string[] | [];
}) {
  const featureLinks =
    selectedFeatures.length > 0
      ? selectedFeatures.map((feature, index) => (
          <Typography key={index} variant="button" display="block" gutterBottom>
            <Link to={`/features/${feature}`}>{feature}</Link>
          </Typography>
        ))
      : "";

  const isDisplayed = selectedFeatures.length > 0 ? "block" : "none";

  return (
    <Box
      sx={{
        display: isDisplayed,
        bgcolor: "background.paper",
        padding: "1rem",
        position: "absolute",
        top: "1rem",
        left: "1rem",
        zIndex: "modal",
      }}
    >
      {featureLinks}
    </Box>
  );
}
