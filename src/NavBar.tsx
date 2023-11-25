import "./NavBar.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar() {
  return (
    <Box sx={{ height: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" sx={{ padding: "0.5rem", width: "100%" }}>
            Native Land Digital
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );

  // return (
  //   <nav id="nav-bar-main" role="navigation" aria-label="Main">
  //     <h1 id="title-nav-bar">Native Land Digital</h1>
  //   </nav>
  // );
}
