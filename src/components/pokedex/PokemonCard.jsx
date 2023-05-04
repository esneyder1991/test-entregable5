import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-teal-500",
  fire: "border-red-500",
  water: "border-blue-500",
  bug: "border-green-500",
  normal: "border-rose-500",
  fighting: "border-orange-700",
  poison: "border-purple-700",
  ghost: "border-indigo-500",
  rock: "border-gray-500",
  dark: "border-black",
  ice: "border-blue-200",
  steel: "border-gray-600",
  dragon: "border-teal-400",
  fairy: "border-pink-800",
  electric: "border-indigo-900",
  ground: "border-yellow-900",
  psychic: "border-yellow-400",
  shadow: "border-black",
  flying: "border-blue-200",
  unknown:"border-gray-800",
  shadow:"border-gray-700",
};

const backgroundByType = {
  grass: "from-teal-500 to-green-400",
  fire: "from-red-500 to-yellow-500 via-red-600",
  water: "from-blue-900 via-blue-500 to-blue-200",
  bug: "from-green-400 to-green-900 via-green-600",
  normal: "from-rose-600 via-rose-400 to-rose-800",
  fighting: "from-orange-900  to-orange-700",
  poison: "from-purple-700 via-purple-600 to-purple-300",
  ghost: "from-indigo-800 via-indigo-700 to-indigo-500",
  rock: "from-gray-500 via-gray-600 to-gray-300",
  dark: "from-gray-900 via-gray-800 to-gray-600",
  ice: "from-blue-300 via-blue-400 to-blue-100",
  steel: "from-gray-700 via-gray-800 to-gray-500",
  dragon: "from-teal-500 via-teal-600 to-blue-gray-300",
  fairy: "from-red-900 via-red-600 to-pink-300",
  electric: "from-blue-900 via-blue-800 to-indigo-700",
  ground: "from-yellow-800 via-yellow-600 to-yellow-400",
  psychic: "from-yellow-500 via-yellow-700 to-yellow-200",
  flying: "from-blue-400 via-purple-200 to-blue-100",
  unknown:"from-gray-800 via-gray-700 to-gray-500",
  shadow:"from-gray-500 via-gray-400 to-gray-200",
};

const colorTextByType = {
  grass: "text-green-600",
  fire: "text-orange-500",
  normal: "text-amber-600",
  fighting: "text-yellow-600",
  flying: "text-red-700",
  poison: "text-violet-600",
  ground: "text-orange-600",
  rock: "text-stone-700",
  bug: "text-green-700",
  ghost: "text-indigo-700",
  steel: "text-teal-600",
  water: "text-sky-600",
  electric: "text-yellow-600",
  psychic: "text-cyan-700",
  ice: "text-cyan-600",
  dragon: "text-sky-600",
  dark: "text-zinc-600",
  fairy: "text-pink-700",
  unknown: "text-slate-600",
  shadow: "text-stone-600",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`text-center border-8 rounded-md ${
        bordersByType[pokemon?.types[0].type.name]
      }`}
    >
      {/* SECCION SUPERIOR */}

      <section
        className={`bg-gradient-to-b ${
          backgroundByType[pokemon?.types[0].type.name]
        } relative h-[150px]`}
      >
        <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2">
          <img src={pokemon?.sprites.other.home.front_default} alt="" />
        </div>
      </section>

      {/* SECCION INFERIOR */}

      <section>
        <h3 className={`${
                  colorTextByType[pokemon?.types[0].type.name]
                } text-2xl mt-10 capitalize `}>{pokemon?.name}</h3>
        <h4 className="capitalize">{types}</h4>
        <span>Type</span>

        <hr />

        <section className="grid grid-cols-3 gap-2 p-2 ">
          {pokemon?.stats.map((stat) => (
            <div  key={stat.stat.name}>
              <h5 className="uppercase text-gray-400">{stat.stat.name}</h5>
              <span
                className={`${
                  colorTextByType[pokemon?.types[0].type.name]
                } text-xl`}
              >
                {stat.base_stat}
              </span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
