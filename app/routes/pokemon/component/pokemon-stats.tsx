import type { PokemonStats } from "~/models/pokemon";
import { PokemonDetailInfo } from "./pokemon-detail-info";
import { Progress } from "~/components/ui/progress";

interface props {
  stats: PokemonStats;
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center py-1 text-gray-700 text-sm">
      <span className="font-medium text-gray-500">{label}</span>
      <div className="flex w-9/12 items-center gap-4">
        <span className="font-semibold text-gray-800">{value}</span>
        <span className="w-full">
          <Progress
            value={value}
            indicatorClassName={value < 50 ? "bg-red-400" : "bg-emerald-400"}
          />
        </span>
      </div>
    </div>
  );
}

export function PokemonStats({ stats }: props) {
  const statValue = (value: number) => <Progress value={value} />;

  return (
    <>
      <Stat label="HP" value={stats.hp} />
      <Stat label="Attack" value={stats.attack} />
      <Stat label="Defense" value={stats.defense} />
      <Stat label="Sp. Atk" value={stats.specialAttack} />
      <Stat label="Sp. Def" value={stats.specialDefense} />
      <Stat label="Speed" value={stats.speed} />
    </>
  );
}
