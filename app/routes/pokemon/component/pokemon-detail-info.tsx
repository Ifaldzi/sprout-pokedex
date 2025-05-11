import { Progress } from "~/components/ui/progress";

export function PokemonDetailInfo({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex py-1 text-gray-700 text-sm">
      <span className="font-medium text-gray-500 w-1/6">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
