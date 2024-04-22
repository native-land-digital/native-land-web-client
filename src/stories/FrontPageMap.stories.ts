import FrontPageMap from "../FrontPageMap";
import {
  withRouter,
  reactRouterParameters,
} from "storybook-addon-remix-react-router"; // storybook plugin to integrate react router

export default {
  title: "FrontPageMap",
  component: FrontPageMap,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/" },
      location: {
        // enter searchParams to simulate a http://localhost:6006/?longitude=-100.1953125&latitude=47.27922900257082
        // this is so that we can test the map at a specific, repeatable location every time
        // if searchParams aren't given, the default is to randomly pick 1 of 3 coordinates
        searchParams: {
          longitude: "-100.1953125",
          latitude: "47.27922900257082",
        },
      },
    }),
  },
};

export const Primary = {
  args: {
    navBarHeight: "6rem",
  },
};
