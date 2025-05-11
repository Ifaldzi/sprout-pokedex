import {
  Pokemon,
  type PokemonStats,
  type PokemonMove,
  type EvolutionChain,
} from "../models/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export class PokemonAPI {
  static async getPokemonList(
    offset: number = 0,
    limit: number = 20
  ): Promise<PokemonListResponse> {
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }
    return response.json();
  }

  static async getEvolutionChain(
    idOrName: number | string
  ): Promise<EvolutionChain[]> {
    const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species for ${idOrName}`);
    }
    const speciesData = await response.json();

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    if (!evolutionResponse.ok) {
      throw new Error(`Failed to fetch evolution chain for ${idOrName}`);
    }
    const evolutionData = await evolutionResponse.json();

    const evolutionChain: EvolutionChain[] = [];
    let current = evolutionData.chain;

    while (current) {
      const pokemonResponse = await fetch(
        `${BASE_URL}/pokemon/${current.species.name}`
      );
      if (!pokemonResponse.ok) continue;
      const pokemonData = await pokemonResponse.json();

      const evolutionDetails = current.evolution_details[0];
      evolutionChain.push({
        name:
          current.species.name.charAt(0).toUpperCase() +
          current.species.name.slice(1),
        image:
          pokemonData.sprites.other["official-artwork"].front_default ||
          pokemonData.sprites.front_default,
        number: `#${pokemonData.id.toString().padStart(3, "0")}`,
        types: pokemonData.types.map((type: any) => type.type),
        evolutionDetails: evolutionDetails
          ? {
              minLevel: evolutionDetails.min_level,
              trigger: evolutionDetails.trigger?.name,
              item: evolutionDetails.item?.name,
            }
          : undefined,
      });

      current = current.evolves_to[0];
    }

    return evolutionChain;
  }

  static async getPokemon(
    idOrName: number | string,
    isForDetail = false
  ): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon ${idOrName}`);
    }
    const data = await response.json();

    // Fetch for detail
    if (isForDetail) {
      const speciesResponse = await fetch(
        `${BASE_URL}/pokemon-species/${data.id}`
      );
      if (!speciesResponse.ok) {
        throw new Error(`Failed to fetch Pokemon species for ${idOrName}`);
      }
      const speciesData = await speciesResponse.json();

      const abilities = data.abilities.map((a: any) => a.ability.name);
      const speciesName =
        speciesData.names.find((name: any) => name.language.name === "en")
          ?.name || speciesData.name;
      const genderRate = speciesData.gender_rate;
      const eggGroups = speciesData.egg_groups.map((g: any) => g.name);
      const eggCycle = speciesData.hatch_counter?.toString() || "";

      const stats: PokemonStats = {
        hp: data.stats.find((stat: any) => stat.stat.name === "hp").base_stat,
        attack: data.stats.find((stat: any) => stat.stat.name === "attack")
          .base_stat,
        defense: data.stats.find((stat: any) => stat.stat.name === "defense")
          .base_stat,
        specialAttack: data.stats.find(
          (stat: any) => stat.stat.name === "special-attack"
        ).base_stat,
        specialDefense: data.stats.find(
          (stat: any) => stat.stat.name === "special-defense"
        ).base_stat,
        speed: data.stats.find((stat: any) => stat.stat.name === "speed")
          .base_stat,
      };

      const evolutionChain = await this.getEvolutionChain(data.id);

      return new Pokemon({
        ...data,
        speciesName,
        abilities,
        genderRate,
        eggGroups,
        eggCycle,
        stats,
        moves: [],
        evolutionChain,
      });
    }

    return new Pokemon(data);
  }

  static async getPokemonMoves(
    idOrName: number | string
  ): Promise<PokemonMove[]> {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon ${idOrName}`);
    }
    const data = await response.json();

    const moves = await Promise.all(
      data.moves.slice(0, 20).map(async (move: any) => {
        const moveResponse = await fetch(move.move.url);
        if (!moveResponse.ok) return null;
        const moveData = await moveResponse.json();

        return {
          name: moveData.name
            .replace(/-/g, " ")
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          type: moveData.type.name,
          power: moveData.power,
          accuracy: moveData.accuracy,
          pp: moveData.pp,
          damageClass: moveData.damage_class.name,
        };
      })
    );

    return moves.filter((move) => move !== null);
  }

  static async getPokemonBatch(
    offset: number = 0,
    limit: number = 20
  ): Promise<Pokemon[]> {
    const listResponse = await this.getPokemonList(offset, limit);
    const pokemonPromises = listResponse.results.map(async (result) => {
      return this.getPokemon(result.name);
    });
    return Promise.all(pokemonPromises);
  }
}
