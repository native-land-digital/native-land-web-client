import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MapLegend({
  selectedFeatures,
}: {
  selectedFeatures: { name: string; id: string | number; slug: string }[] | [];
}) {
  const featureLinks =
    selectedFeatures.length > 0
      ? selectedFeatures.map((feature, index) => (
          <ListItemButton key={index} sx={{ cursor: "pointer" }} divider>
            <Link to={`/features/${feature.slug}`} style={{ width: "100%" }}>
              <ListItemText
                primary={feature.name}
                sx={{ color: "common.white" }}
                primaryTypographyProps={{ style: { fontSize: "1.7rem" } }}
                // inset
              />
            </Link>
          </ListItemButton>
        ))
      : [];

  const isDisplayed = selectedFeatures.length > 0 ? "block" : "none";

  // const FeaturesList = styled(List)({
  //   bgcolor: "info.dark",
  //   position: "absolute",
  //   top: "1.5rem",
  //   left: "1.5rem",
  //   zIndex: "modal",
  //   width: "30rem",
  //   "& .MuiListItemText-root": {
  //     color: "common.white"
  //   },
  //   "& .MuiListSubheader-root": {
  //     bgcolor: "grey.800",
  //     color: "info.light",
  //     fontSize: "1.7rem",
  //   }
  // });

  return (
    <List
      sx={{
        display: isDisplayed,
        bgcolor: "info.dark",
        position: "absolute",
        top: "1.5rem",
        left: "1.5rem",
        zIndex: "modal",
        width: "30rem",
      }}
      component="nav"
      disablePadding
    >
      <ListSubheader
        sx={{
          bgcolor: "grey.800",
          color: "info.light",
          fontSize: "1.7rem",
        }}
      >
        Selected Features
      </ListSubheader>
      {featureLinks}
    </List>
  );
}
