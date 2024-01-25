import dayjs from "dayjs";

import { styled } from "@mui/material";
import Chip from "@mui/material/Chip";
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
  created_at,
  last_modified_at,
}: {
  category?: featureCategory;
  infoChipType: infoChipType;
  created_at?: string;
  last_modified_at?: string;
}) {
  // pretty complicated syntax, this is the only way i can currently find to use infoChipType to conditionally render special features of the "Category" <InfoChip>
  const StyledChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== "infoChipType",
  })<{ infoChipType?: string }>(({ infoChipType }) => {
    if (infoChipType === "category") {
      return {
        fontSize: "1rem",
        fontWeight: "bold",
      };
    } else {
      return {};
    }
  });

  let color: "primary" | "success" | "secondary",
    icon,
    label,
    size = "medium" as "medium" | "small";

  switch (infoChipType) {
    case "category":
      color = "primary";
      label = category ? getChipLabel(category) : "";
      icon = <LandscapeIcon />;
      size = "medium";
      break;
    case "createdAt":
      color = "success";
      icon = <WbSunnyIcon />;
      label = created_at ? `Created ${getFormattedDate(created_at)}` : "";
      size = "small";
      break;
    case "lastModified":
      color = "secondary";
      icon = <EditNoteIcon />;
      label = last_modified_at
        ? `Last Updated ${getFormattedDate(last_modified_at)}`
        : "";
      size = "small";
      break;
  }

  return (
    <StyledChip
      color={color}
      icon={icon}
      infoChipType={infoChipType}
      label={label}
      size={size}
      sx={{
        mb: "1rem",
        ml: infoChipType === "category" ? 0 : "1rem",
        px: "1rem",
        maxWidth: "min-content",
        cursor: "default",
      }}
    />
  );
}
