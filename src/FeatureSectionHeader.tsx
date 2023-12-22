import Typography from "@mui/material/Typography";

export default function FeatureSectionHeader({
  text,
  xPadding,
}: {
  text: string;
  xPadding: number;
}) {
  return (
    <Typography
      component="h3"
      variant="h5"
      sx={{
        color: "primary.contrastText",
        fontStyle: "italic",
        mx: xPadding + "rem",
        mt: "1rem",
      }}
    >
      {text}
    </Typography>
  );
}
