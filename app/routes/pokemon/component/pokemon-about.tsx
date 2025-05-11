import type { Pokemon } from "~/models/pokemon";
import { PokemonDetailInfo } from "./pokemon-detail-info";

interface props {
  pokemon: Pokemon;
}

export default function PokemonAbout({ pokemon }: props) {
  const gender = (
    <>
      <span className="text-blue-600 font-bold">
        ♂ {100 - pokemon.genderRate}%
      </span>{" "}
      <span className="text-pink-500 font-bold">♀ {pokemon.genderRate}%</span>
    </>
  );

  return (
    <>
      <div className="mb-6">
        <PokemonDetailInfo label="Species" value={pokemon.species} />
        <PokemonDetailInfo
          label="Height"
          value={`${Math.floor(pokemon.height * 0.328084)}' ${Math.floor(
            (pokemon.height * 0.328084 -
              Math.floor(pokemon.height * 0.328084)) *
              12
          )}" (${Math.floor(pokemon.height * 10)} cm)`}
        />
        <PokemonDetailInfo
          label="Weight"
          value={`${pokemon.weight * 0.22} lbs (${pokemon.weight} kg)`}
        />
        <PokemonDetailInfo
          label="Abilities"
          value={pokemon.abilities
            .map(
              (ability) => ability.charAt(0).toUpperCase() + ability.slice(1)
            )
            .join(", ")}
        />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-700 mb-2">Breeding</h3>
        <PokemonDetailInfo label="Gender" value={gender} />
        <PokemonDetailInfo
          label="Egg Groups"
          value={pokemon.eggGroups
            .map((egg) => egg.charAt(0).toUpperCase() + egg.slice(1))
            .join(", ")}
        />
        <PokemonDetailInfo label="Egg Cycle" value={pokemon.eggCycle} />
      </div>
    </>
  );
}
