// import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";

import FrontPageMap from "./FrontPageMap";
import NavBar from "./NavBar";

function App() {
  return (
    <Grid container>
      <Grid xs={12}>
        <NavBar />
      </Grid>
      <Grid xs={12}>
        <FrontPageMap />
      </Grid>
    </Grid>
  );
}

export default App;
