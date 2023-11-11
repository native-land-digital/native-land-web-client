import { Box, Typography } from "@mui/material";

export default function MapLegend({
  selectedFeatures,
}: {
  selectedFeatures: string[] | [];
}) {
  const featureLinks =
    selectedFeatures.length > 0
      ? selectedFeatures.map((feature) => (
          // <li>
          //   <a href={`/features/${feature}`}>{feature}</a>
          // </li>
          <Typography variant="button" display="block" gutterBottom>
            {feature}
            {/* <a href={`/features/${feature}`}>{feature}</a> */}
          </Typography>
        ))
      : "";

  return (
    <Box
      sx={{
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

  // return (
  //   <nav id="map-legend">
  //     <ul>{featureLinks}</ul>
  //   </nav>
  // );
}
