import React from "react";
import { Link, NavLink, useNavigate } from "react-router";

type PokedexCardProps = {
  name: string;
  type: string[];
  number: string;
  image: string;
  color: string;
};

export function PokedexCard({
  name,
  type,
  number,
  image,
  color,
}: PokedexCardProps) {
  const navigate = useNavigate();
  return (
    <NavLink
      to={`/${name.toLowerCase()}`}
      className={`rounded-2xl p-4 flex flex-col justify-center relative shadow-md ${color} transition hover:scale-105 hover:cursor-pointer`}
      // onClick={() => navigate(`/${name}`)}
    >
      <span className="absolute top-2 right-3 text-white/60 font-bold text-sm select-none">
        {number}
      </span>
      <div className="flex-row flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-bold text-white drop-shadow-sm mb-2">
            {name}
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            {type.map((t) => (
              <span
                key={t}
                className="bg-white/30 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm capitalize w-fit"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <img src={image} alt={name} className="w-16 h-16 drop-shadow-lg" />
      </div>
    </NavLink>
  );
}
