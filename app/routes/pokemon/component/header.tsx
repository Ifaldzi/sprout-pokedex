import { NavLink } from "react-router";
import type { Pokemon } from "~/models/pokemon";

interface props {
  pokemon: Pokemon;
}

function PokemonTypeBadge({ type }: { type: string }) {
  return (
    <span className="bg-white/30 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm capitalize w-fit">
      {type}
    </span>
  );
}

export function PokemonHeader({ pokemon }: props) {
  return (
    <div className={`relative ${pokemon.color} p-6 pb-24`}>
      <header className="w-full flex items-center justify-between mb-6">
        <NavLink to={"/"} className="text-2xl font-bold text-gray-700">
          &#8592;
        </NavLink>
      </header>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-white drop-shadow">
          {pokemon.name}
        </h2>
        <span className="text-white/80 font-bold text-lg select-none">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      </div>
      <div className="flex gap-2 mt-2">
        {pokemon.typeNames.map((type) => (
          <PokemonTypeBadge key={type} type={type} />
        ))}
      </div>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-40 h-40 absolute left-1/2 -translate-x-1/2 top-32 drop-shadow-xl z-10"
      />
    </div>
  );
}
