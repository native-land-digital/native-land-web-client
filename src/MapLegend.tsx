import { styled } from "@mui/material";
import { ListProps } from "@mui/material/List";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";

import { Link as RouterLink } from "react-router-dom";

export default function MapLegend({
  selectedFeatures,
}: {
  selectedFeatures: { name: string; id: string | number; slug: string }[] | [];
}) {
  const featureLinks =
    selectedFeatures.length > 0
      ? selectedFeatures.map((feature, index) => (
          <ListItemButton
            key={index}
            component={RouterLink} // integrating React Router link with material UI
            to={`/features/${feature.slug}`}
            divider
          >
            {feature.name}
          </ListItemButton>
        ))
      : [];

  // material UI styled() utility
  const FeaturesList = styled(List)<ListProps>(({ theme }) => ({
    backgroundColor: theme.palette.info.dark,
    disablePadding: true,
    "& .MuiListSubheader-root": {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.info.light,
      fontSize: "1.3rem",
    },
    "& .MuiListItemButton-root": {
      color: theme.palette.common.white,
      fontFamily: theme.typography.fontFamily,
      fontSize: "1.2rem",
      fontWeight: theme.typography.fontWeightLight,
    },
  }));

  return (
    <FeaturesList
      sx={{
        display: selectedFeatures.length > 0 ? "block" : "none",
      }}
      disablePadding
    >
      <ListSubheader>Selected Features</ListSubheader>
      {featureLinks}
    </FeaturesList>
  );
}
