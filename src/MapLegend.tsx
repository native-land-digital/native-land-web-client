import {
  List,
  ListProps,
  ListItemButton,
  ListItemText,
  ListSubheader,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MapLegend({
  navBarHeight,
  selectedFeatures,
}: {
  navBarHeight: string;
  selectedFeatures: { name: string; id: string | number; slug: string }[] | [];
}) {
  const featureLinks =
    selectedFeatures.length > 0
      ? selectedFeatures.map((feature, index) => (
          <ListItemButton key={index} divider>
            <Link to={`/features/${feature.slug}`} style={{ width: "100%" }}>
              <ListItemText
                primary={feature.name}
                primaryTypographyProps={{ style: { fontSize: "1.7rem" } }}
              />
            </Link>
          </ListItemButton>
        ))
      : [];

  const FeaturesList = styled(List)<ListProps>(({ theme }) => ({
    backgroundColor: theme.palette.info.dark,
    cursor: "pointer",
    disablePadding: true,
    position: "absolute",
    top: `calc(${navBarHeight} + 1.5rem)`,
    left: "1.5rem",
    width: "30rem",
    "& .MuiListItemText-root": {
      color: theme.palette.common.white,
    },
    "& .MuiListSubheader-root": {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.info.light,
      fontSize: "1.7rem",
    },
  }));

  return (
    <FeaturesList
      sx={{
        display: selectedFeatures.length > 0 ? "block" : "none",
        zIndex: "modal",
      }}
      disablePadding
    >
      <ListSubheader>Selected Features</ListSubheader>
      {featureLinks}
    </FeaturesList>
  );
}
