import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/home.tsx"),
  route("/:name", "routes/pokemon/detail.tsx"),
] satisfies RouteConfig;
