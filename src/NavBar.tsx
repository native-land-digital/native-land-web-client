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
          }}
          noWrap
        >
          Native Land Digital
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
