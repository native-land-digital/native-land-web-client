import "./NavBar.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function NavBar({ navBarHeight }: { navBarHeight: string }) {
  return (
    <AppBar position="static" sx={{ height: navBarHeight }}>
      <Toolbar>
        <Typography variant="h2" sx={{ padding: "0.5rem", width: "100%" }}>
          Native Land Digital
        </Typography>
      </Toolbar>
    </AppBar>
  );

  // return (
  //   <nav id="nav-bar-main" role="navigation" aria-label="Main">
  //     <h1 id="title-nav-bar">Native Land Digital</h1>
  //   </nav>
  // );
}
