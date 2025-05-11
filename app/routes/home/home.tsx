import type { Route } from "./+types/home";
import { Pokedex } from "./component/pokedex";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokedex" },
    { name: "Pokedex", content: "Welcome to Pokedex!" },
  ];
}

export default function Home() {
  return <Pokedex />;
}
