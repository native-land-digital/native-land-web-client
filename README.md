# Native Land Web 2.0 (Client)
This is a new version of Native Land Digital's web app, meant to replace the current WordPress & Mapster frontend.

Built with:
- React
- TypeScript
- yarn
- Vite
- Mapbox + [react-map-gl](https://github.com/visgl/react-map-gl)
- Postgres

## Dev Setup
Note that `server` and `client` are decoupled and in separate repos.

1. Create a `native-land-web` root folder to hold both client and server folders.
2. Run `git clone` to copy this repo (`native-land-web-client`) into root.
3. Run `git clone` to copy [`native-land-web-server`](https://github.com/native-land-digital/native-land-web-server) into root.
4. Run `yarn` in both folders to install dependencies.
5. Reach out to Native Land staff on Slack (**ping \@Will Gutierrez**) to get access to dev materials:
   - Mapbox development token, which goes into an `.env.local` file in `client` as `VITE_MAPBOX_TOKEN`
   - sample SQL inserts
6. Create a PostgreSQL server with a `native_land_digital` database, and insert SQL.
7. Fill out a `.env` file to connect `native-land-web-server` to database.
8. `cd native-land-web-client` and `yarn dev` to start both `client` and `server` at the same time.
9. Navigate to `localhost:5173` in your browser.

## Data Flow Diagram
This is a diagram of how the data flows within the app, and interacts with both the server and Native Land's Mapbox account (which is the source of truth for the front page map):

<img width="1265" alt="Native Land React Dataflow" src="https://github.com/native-land-digital/native-land-web-client/assets/4361605/99f38ddb-d593-4c80-8dff-83b4ed1ca72a">

Note that these two flows are distinct from and don't depend on one another:
1. User viewing (reading) features from the map - (***the goal of this first iteration of the new frontend***)
2. Researchers creating, updating, and deleting features - (***to be tackled in a different milestone after the new frontend goes live***)
