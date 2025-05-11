import React, { useState, useEffect, useRef } from "react";
import { PokedexCard } from "./pokedex-card";
import { Pokemon } from "../../../models/pokemon";
import { PokemonAPI } from "../../../lib/pokemon-api";
import { useNavigation } from "react-router";

export function Pokedex() {
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    loadInitialPokemon();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMorePokemon();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [page, loading, hasMore]);

  const loadInitialPokemon = async () => {
    try {
      setLoading(true);
      const pokemons = await PokemonAPI.getPokemonBatch(0, 20);
      setDisplayedPokemons(pokemons);
      setPage(1);
    } catch (error) {
      console.error("Failed to load initial Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = async () => {
    try {
      setLoading(true);
      const offset = page * 20;
      const newPokemons = await PokemonAPI.getPokemonBatch(offset, 20);

      if (newPokemons.length === 0) {
        setHasMore(false);
        return;
      }

      setDisplayedPokemons((prev) => [...prev, ...newPokemons]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load more Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isNavigating) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 p-4 flex flex-col items-center">
      <header className="w-full flex items-center justify-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Pokedex</h1>
      </header>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
        {displayedPokemons.map((pokemon) => (
          <PokedexCard
            key={pokemon.id}
            name={pokemon.name}
            type={pokemon.typeNames}
            number={pokemon.number}
            image={pokemon.image}
            color={pokemon.color}
          />
        ))}
      </div>
      <div
        ref={observerTarget}
        className="h-10 w-full flex items-center justify-center"
      >
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
        )}
      </div>
    </div>
  );
}
