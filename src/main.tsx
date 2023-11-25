import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

import FrontPageMap from "./FrontPageMap.tsx";
import Feature from "./Feature.tsx";
import NavBar from "./NavBar.tsx";

import "./index.css";
// fonts for material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPageMap />,
    // errorElement: null // todo
  },
  {
    path: "features/:feature",
    element: <Feature />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Grid container sx={{ height: "100vh" }}>
      <Grid xs={12} sx={{ height: "7vh" }}>
        <NavBar />
      </Grid>
      <Grid xs={12} sx={{ height: "93vh" }}>
        <RouterProvider router={router} />
      </Grid>
    </Grid>
  </React.StrictMode>
);
