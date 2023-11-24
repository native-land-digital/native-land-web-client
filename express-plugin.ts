export default function express(path: string) {
  return {
    name: "vite-plugin-express",
    configureServer: async (server) => {
      server.middlewares.use(async (request, response, next) => {
        process.env["VITE"] = "true";

        try {
          const { app } = await server.ssrLoadModule(path);
          app(request, response, next);
        } catch (error) {
          console.error(error);
        }
      });
    },
  };
}
