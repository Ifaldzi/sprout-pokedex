import React from "react";
import { PokemonAPI } from "../../lib/pokemon-api";
import { Pokemon } from "../../models/pokemon";
import type { Route } from "./+types/detail";
import PokemonAbout from "./component/pokemon-about";
import { PokemonHeader } from "./component/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PokemonStats } from "./component/pokemon-stats";
import PokemonMoves from "./component/pokemon-moves";
import PokemonEvolution from "./component/pokemon-evolution";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { name } = params;
  if (!name) throw new Error("Missing Pokemon name");
  try {
    const pokemon = await PokemonAPI.getPokemon(name, true);
    return pokemon;
  } catch (e) {
    return null;
  }
}

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `Pokemon | ${
        params.name.charAt(0).toUpperCase() + params.name.slice(1)
      }`,
    },
    { name: "Pokemon detail", content: "The detail of Pokemon" },
  ];
}

export default function PokemonDetail({ loaderData }: Route.ComponentProps) {
  const pokemon = loaderData;

  if (pokemon === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-200 to-emerald-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!pokemon) {
    return <div className="text-center mt-20 text-xl">Pokemon not found.</div>;
  }

  return (
    <div className="w-full">
      <PokemonHeader pokemon={pokemon} />
      <Tabs
        defaultValue="about"
        className="bg-white rounded-t-3xl pt-32 pb-8 px-6 -mt-16"
      >
        <TabsList className="w-full flex border-b mb-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="stats">Base Stats</TabsTrigger>
          <TabsTrigger value="evolution">Evolution</TabsTrigger>
          <TabsTrigger value="moves">Moves</TabsTrigger>
        </TabsList>
        <TabsContent value="about" asChild>
          <PokemonAbout pokemon={pokemon} />
        </TabsContent>
        <TabsContent value="stats" asChild>
          <PokemonStats stats={pokemon.stats} />
        </TabsContent>
        <TabsContent value="evolution" asChild>
          <PokemonEvolution pokemon={pokemon} />
        </TabsContent>
        <TabsContent value="moves" asChild>
          <PokemonMoves pokemonName={pokemon.name.toLowerCase()} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
