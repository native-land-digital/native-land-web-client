import { useState } from "react";

import Alert from "@mui/material/Alert";

export default function DisclaimerNotice() {
  const [display, setDisplay] = useState("flex");

  return (
    <Alert
      variant="filled"
      onClose={() => setDisplay("none")}
      icon={false}
      severity="info"
      sx={{ borderRadius: 0, display }}
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
