import Chip from "@mui/material/Chip";
import dayjs from "dayjs";

import LandscapeIcon from "@mui/icons-material/Landscape";
import EditNoteIcon from "@mui/icons-material/EditNote";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

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

// for displaying lastModified and createdAt
const getFormattedDate = (dateString: string) =>
  dayjs(dateString).format("MMMM D, YYYY");

export default function InfoChip({
  category,
  infoChipType,
  wordpress_created_at,
  wordpress_last_modified_at,
}: {
  category: featureCategory;
  infoChipType: infoChipType;
  wordpress_created_at: string;
  wordpress_last_modified_at: string;
}) {
  let color: "primary" | "success" | "secondary", icon, label;

  switch (infoChipType) {
    case "category":
      color = "primary";
      label = getChipLabel(category);
      icon = <LandscapeIcon />;
      break;
    case "createdAt":
      color = "success";
      icon = <WbSunnyIcon />;
      label = `Created ${getFormattedDate(wordpress_created_at)}`;
      break;
    case "lastModified":
      color = "secondary";
      icon = <EditNoteIcon />;
      label = `Last Updated ${getFormattedDate(wordpress_last_modified_at)}`;

      break;
  }

  return (
    <Chip
      color={color}
      icon={icon}
      label={label}
      size="small"
      sx={{ mb: "1rem", ml: "1rem", px: "1rem" }}
    />
  );
}
