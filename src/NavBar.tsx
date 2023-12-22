import { Link as RouterLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar({ navBarHeight }: { navBarHeight: string }) {
  return (
    <AppBar
      position="static"
      sx={{
        height: navBarHeight,
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          sx={{
            padding: "0.5rem",
            width: "100%",
            fontSize: "2.5rem",
            fontWeight: "light",
            textAlign: {
              xs: "center",
              sm: "left",
              md: "left",
              lg: "left",
              xl: "left",
            },
            a: {
              color: "white",
              textDecoration: "none",
            },
          }}
          noWrap
        >
          <RouterLink to="/">Native Land Digital</RouterLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
