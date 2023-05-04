import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  //? Array de pokemons antes de filtrar
  const [pokemons, setPokemons] = useState([]);

  //?string para filtrar los pokemon por nombre

  const [pokemonName, setPokemonName] = useState("");

  //? Arreglo de tipos de pokemons posibles
  const [types, setTypes] = useState([]);

  //? String del tipo de pokemon actual, que cambia de acuerdo al select
  const [currentType, setcurrentType] = useState("");

  //?Pagina actual

  const [currentPage, setCurrentPage] = useState(1);

  //? Estado global donde se almacena el nombre del usuario

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const paginationLogic = () => {
    //Cantidad de pokemons por página
    const POKEMONS_PER_PAGE = 12
    
    //pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    //Última página
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //Bloque actual
    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK )

    //paginas que se van a mostrar en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
   
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for(let i = minPage; i <= maxPage; i++ ){

      if(i <= lastPage){
        
        pagesInBlock.push(i)
      }
    }

    return {pokemonInPage, lastPage, pagesInBlock}
  }

  const {pokemonInPage, lastPage, pagesInBlock} = paginationLogic()

  const handleClickPreviusPage = () =>{
    const newCurrentPage = currentPage - 1
    if(newCurrentPage >= 1){

      setCurrentPage(newCurrentPage)

    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }


  useEffect(() => {
    if(!currentType){
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

    axios
      .get(URL)
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

      axios
        .get(URL)
        .then((res) =>{
            const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
           
            setPokemons(pokemonsByType)
        } )
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
      setCurrentPage(1)
  }, [pokemonName, currentType])

  return (
    <section className="min-h-screen  justify-center items-center">
      <Header />

      {/* SECCION DE FILTROS Y SALUDO */}
      <section className="py-6 px-2 text-center">
        <h3> <span className="font-bold text-red-600">Welcome {nameTrainer},</span> <span className="font-medium">here you can find your favorite pokemon</span> </h3>
        <div className="" >
        <form className="flex mx-auto  max-w-[900px]" onSubmit={handleSubmit}>
          <div >
            <input
              id="pokemonName"
              type="text"
              placeholder="Search your pokemon" className="border-gray-500 mt-6 shadow-md px-10 py-1 rounded-sm flex-1 mr-2"
            />
            <button className='bg-red-600 px-10 py-1 text-white rounded-sm flex-1 mr-20'>Search</button>
          </div>
          <select className="flex-1 self-end border-gray-500 shadow-md py-2" onChange={(e) => setcurrentType(e.target.value)}>
            <option value="">All</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
        </div>
        
      </section>

      

      {/* SECCION LISTA DE POKEMONS */}
      <section className="px-2 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] max-w-[900px] mx-auto">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>

      {/* PAGINACIÓN */}

      <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">


          {/* PRIMERA PAGINA */}

          <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>


          {/* PAGINA ANTERIOR */}

        <li onClick={handleClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<"}</li>

         {/* LISTA DE PAGINAS */}

        {
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage === currentPage && "bg-red-400"}`} key={numberPage}>{numberPage}</li>)
        }

        {/* PAGINA SIGUIENTE  */}

        <li onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">"}</li>

         {/* ULTIMA PAGINA  */}
        
         <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">>"}</li>
      </ul>
    </section>
  );
};

export default Pokedex;
