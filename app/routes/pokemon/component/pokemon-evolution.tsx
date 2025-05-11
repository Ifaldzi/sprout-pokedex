import React from "react";
import { Pokemon } from "~/models/pokemon";
import { cn } from "~/lib/utils";

interface PokemonEvolutionProps {
  pokemon: Pokemon;
}

export default function PokemonEvolution({ pokemon }: PokemonEvolutionProps) {
  if (!pokemon.evolutionChain || pokemon.evolutionChain.length <= 1) {
    return (
      <div className="text-center py-8 text-gray-500">
        This Pokemon does not evolve.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        {pokemon.evolutionChain.map((evolution, index) => (
          <React.Fragment key={evolution.name}>
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={evolution.image}
                  alt={evolution.name}
                  className={cn(
                    "w-32 h-32 object-contain",
                    evolution.name === pokemon.name &&
                      "ring-4 ring-emerald-500 rounded-full"
                  )}
                />
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  {evolution.number}
                </div>
              </div>
              <h3 className="text-lg font-semibold mt-2">{evolution.name}</h3>
              <div className="flex gap-2 mt-1">
                {evolution.types.map((type) => (
                  <span
                    key={type.name}
                    className={cn(
                      "px-2 py-1 rounded-full text-xs text-white",
                      `bg-${type.name}-500`
                    )}
                  >
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </span>
                ))}
              </div>
              {evolution.evolutionDetails && (
                <div className="mt-2 text-sm text-gray-600">
                  {evolution.evolutionDetails.minLevel && (
                    <p>Level {evolution.evolutionDetails.minLevel}</p>
                  )}
                  {evolution.evolutionDetails.trigger && (
                    <p>
                      {evolution.evolutionDetails.trigger
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </p>
                  )}
                  {evolution.evolutionDetails.item && (
                    <p>
                      {evolution.evolutionDetails.item
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </p>
                  )}
                </div>
              )}
            </div>
            {index < pokemon.evolutionChain.length - 1 && (
              <div className="flex items-center justify-center w-full">
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
