export interface PokemonType {
  name: string;
  url: string;
}

export interface EvolutionChain {
  name: string;
  image: string;
  number: string;
  types: PokemonType[];
  evolutionDetails?: {
    minLevel?: number;
    trigger?: string;
    item?: string;
  };
}

export interface PokemonMove {
  name: string;
  type: string;
  power: number | null;
  accuracy: number | null;
  pp: number;
  damageClass: string;
}

export interface PokemonSprites {
  front_default: string;
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export class Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  color: string;
  species: string;
  height: number;
  weight: number;
  abilities: string[];
  genderRate: number;
  eggGroups: string[];
  eggCycle: string;
  stats: PokemonStats;
  moves: PokemonMove[];
  evolutionChain: EvolutionChain[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    this.types = data.types.map((type: any) => type.type);
    this.sprites = data.sprites;
    this.color = this.getColorByType(this.types[0].name);
    this.species = data.speciesName || "";
    this.height = data.height;
    this.weight = data.weight;
    this.abilities = data.abilities || [];
    this.genderRate = data.genderRate || 0;
    this.eggGroups = data.eggGroups || [];
    this.eggCycle = data.eggCycle || "";
    this.stats = data.stats || null;
    this.moves = data.moves || [];
    this.evolutionChain = data.evolutionChain || [];
  }

  private getColorByType(type: string): string {
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
  }

  get number(): string {
    return `#${this.id.toString().padStart(3, "0")}`;
  }

  get image(): string {
    return (
      this.sprites.other["official-artwork"].front_default ||
      this.sprites.front_default
    );
  }

  get typeNames(): string[] {
    return this.types.map(
      (type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)
    );
  }
}
