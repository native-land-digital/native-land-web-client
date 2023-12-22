import Typography from "@mui/material/Typography";

export default function FeatureSectionHeader({
  xPadding,
  text,
}: {
  xPadding: string;
  text: string;
}) {
  return (
    <Typography
      component="h3"
      variant="h5"
      sx={{
        color: "primary.contrastText",
        fontStyle: "italic",
        mx: xPadding,
        mt: "1rem",
      }}
    >
      {text}
    </Typography>
  );
}
