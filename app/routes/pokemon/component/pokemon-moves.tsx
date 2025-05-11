import React, { useEffect, useState } from "react";
import type { PokemonMove } from "~/models/pokemon";
import { PokemonAPI } from "~/lib/pokemon-api";

interface PokemonMovesProps {
  pokemonName: string;
}

export default function PokemonMoves({ pokemonName }: PokemonMovesProps) {
  const [moves, setMoves] = useState<PokemonMove[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        setLoading(true);
        const movesData = await PokemonAPI.getPokemonMoves(pokemonName);
        setMoves(movesData);
        setError(null);
      } catch (err) {
        setError("Failed to load moves");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoves();
  }, [pokemonName]);

  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      normal: "bg-gray-400",
      fire: "bg-red-300",
      water: "bg-sky-300",
      electric: "bg-yellow-200",
      grass: "bg-emerald-400",
      ice: "bg-cyan-200",
      fighting: "bg-red-500",
      poison: "bg-purple-400",
      ground: "bg-amber-500",
      flying: "bg-indigo-300",
      psychic: "bg-pink-400",
      bug: "bg-lime-400",
      rock: "bg-stone-500",
      ghost: "bg-purple-500",
      dragon: "bg-indigo-500",
      dark: "bg-gray-700",
      steel: "bg-slate-400",
      fairy: "bg-pink-200",
    };

    return typeColors[type] || "bg-gray-400";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {moves.map((move, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {move.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm text-white ${getTypeColor(
                  move.type
                )}`}
              >
                {move.type.charAt(0).toUpperCase() + move.type.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Power:</span>{" "}
                {move.power ? move.power : "—"}
              </div>
              <div>
                <span className="font-medium">Accuracy:</span>{" "}
                {move.accuracy ? `${move.accuracy}%` : "—"}
              </div>
              <div>
                <span className="font-medium">PP:</span> {move.pp}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Damage Class:</span>{" "}
              {move.damageClass.charAt(0).toUpperCase() +
                move.damageClass.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
