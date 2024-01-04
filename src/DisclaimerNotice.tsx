import Alert from "@mui/material/Alert";

export default function DisclaimerNotice({
  setDisclaimerDisplay,
}: {
  setDisclaimerDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    localStorage.setItem("isDisclaimerClosed", "true");
    setDisclaimerDisplay(false);
  };

  return (
    <Alert
      variant="filled"
      onClose={handleClose}
      icon={false}
      severity="info"
      sx={{ borderRadius: 0 }}
    >
      <p>Welcome to Native Land Digital! 👋</p>
      <p>
        This map does not represent or intend to represent official or legal
        boundaries of any Indigenous nations. To learn about definitive
        boundaries, contact the nations in question.
      </p>
      <p>
        Also, this map is not perfect—it is a work in progress with tons of
        contributions from the community. Please send us fixes if you find
        errors.
      </p>
    </Alert>
  );
}
