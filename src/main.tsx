import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as featureLoader } from "./loaders/features.ts";

import App from "./App.tsx";
import FrontPageMap from "./FrontPageMap.tsx";
import Feature from "./Feature.tsx";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// fonts for material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { grey } from "@mui/material/colors";

const defaultTheme = createTheme({
  palette: { background: { default: grey[700] } },
});

const navBarHeight = "5rem"; // used for dynamic CSS calculation: FrontPageMap's height is 100vh - navBarHeight.

const router = createBrowserRouter([
  {
    path: "/",
    element: <App navBarHeight={navBarHeight} />,
    // errorElement: null // todo
    children: [
      {
        path: "/",
        element: <FrontPageMap navBarHeight={navBarHeight} />,
      },
      {
        path: "features/:slug",
        element: <Feature />,
        loader: featureLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
