import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import FrontPageMap from "./FrontPageMap.tsx";
import Feature from "./Feature.tsx";
import { loader as featureLoader } from "./loaders/features.ts";
import NavBar from "./NavBar.tsx";

import CssBaseline from "@mui/material/CssBaseline";

// fonts for material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const navBarHeight = "5rem"; // used for dynamic CSS calculation: FrontPageMap's height is 100vh - navBarHeight.

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPageMap navBarHeight={navBarHeight} />,
    // errorElement: null // todo
  },
  {
    path: "features/:slug",
    element: <Feature />,
    loader: featureLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <NavBar navBarHeight={navBarHeight} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
