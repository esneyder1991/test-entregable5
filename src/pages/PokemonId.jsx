import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const backgroundByType = {
  grass: "from-teal-500 to-green-400",
  fire: "from-red-500 to-yellow-500 via-red-600",
  water:"from-blue-900 via-blue-500 to-blue-200",
  bug:"from-green-400 to-green-900 via-green-600",
  normal:"from-rose-600 via-rose-400 to-rose-800",
  fighting:"from-orange-900  to-orange-700",
  poison:"from-purple-700 via-purple-600 to-purple-300",
  ghost:"from-indigo-800 via-indigo-700 to-indigo-500",
  rock:"from-gray-500 via-gray-600 to-gray-300",
  dark:"from-gray-900 via-gray-800 to-gray-600",
  ice:"from-blue-300 via-blue-400 to-blue-100",
  steel:"from-gray-700 via-gray-800 to-gray-500",
  dragon:"from-teal-500 via-teal-600 to-blue-gray-300",
  fairy:"from-red-900 via-red-600 to-pink-300",
  electric:"from-blue-900 via-blue-800 to-indigo-700",
  ground:"from-yellow-800 via-yellow-600 to-yellow-400",
  psychic:"from-yellow-500 via-yellow-700 to-yellow-200",
  flying:"from-blue-400 via-purple-200 to-blue-100",
}

const PokemonId = () => {

  const [pokemon, setPokemon] = useState()


 const {id} = useParams()
 
    useEffect(() => {

      const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

      axios.get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))

    }, [])

    const getPercentStatBar = (stat_base) => {
      const percentBarProgres = Math.floor((stat_base *100)/255)
      return `${percentBarProgres}%`
    }


  return (
    <section>
      <Header />

      <section className='px-2 py-14'>
          
        <article className='max-w-[768px] mx-auto shadow-xl p-2'>

          {/* SECCION SUPERIOR */}

          <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[120px] rounded-sm`}>

            <div className='w-[200px]  mx-auto absolute left-1/2 -translate-x-1/2 -top-20'>
              <img src={pokemon?.sprites.other.home.front_default} alt="" />
            </div>

          </section>

          {/* INFORMACION GENERAL */}
          <section  >
             
             <div>
              <h3 className='mx-auto max-w-max font-bold text-2xl text-gray-700 border-2 border-gray-300 mt-4 px-2 '>#{pokemon?.id}</h3>
             </div>

             <div className='grid grid-cols-[1fr_auto_1fr] items-center gap-2'>
              <hr className='border-gray-300 ml-12' />
              <h2 className='capitalize font-semibold text-4xl text-gray-700'>{pokemon?.name}</h2>
              <hr className='border-gray-300 mr-12' />
             </div>

             <div className='flex justify-center gap-6 text-center'>
              <div>
                <h5 className='text-xs mt-3'>Weight</h5>
                <span className='font-bold'>{pokemon?.weight}</span>
              </div>

              <div>
                <h5 className='text-xs mt-3'>Height</h5>
                <span className='font-bold'>{pokemon?.height}</span>
              </div>
             </div>

             <section className='grid sm:grid-cols-2 gap-4'>

              {/* TIPOS */}
              <section className='text-center '>
                <h3 className='font-semibold text-2xl'>Types</h3>

                <section className='grid grid-cols-2 gap-4 mt-4'>
                  {
                    pokemon?.types.map(type => <article className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]}   p-2 px-8 border-[1px] border-gray-300  capitalize text-white rounded-sm`} key={type.type.name}>{type.type.name}</article>)
                  }
                </section>
              </section>

              {/* HABILIDADES */}

              <section className='text-center'>
              <h3 className='font-semibold text-2xl'>Abilities</h3>

              <section className='grid grid-cols-2 gap-4 mt-4'>
                {
                  pokemon?.abilities.map(ability => <article className='p-2 px-8 border-[1px] border-gray-300 capitalize truncate' key={ability.ability.name}>{ability.ability.name}</article>)
                }
                           
                </section>
              </section>
             </section>

          </section>


          {/* SECCION DE STATS  */}
          <section>

             <div className='flex items-center mt-20'>
               <h3 className='text-4xl'>Stats</h3>
               <hr className='border-gray-200 flex-grow ml-6 ' />

             </div>
             
           
            

            <section className='grid gap-4 py-2 mt-8'>
              {
                pokemon?.stats.map(stat => (
                  <article key={stat.stat.name}>
                    <section className='flex justify-between'>
                      <h5 className='capitalize font-semibold '>{stat.stat.name}</h5>

                      <span className='font-semibold text-sm text-gray-800'>{stat.base_stat}/255</span>
                    </section>

                    <div className='bg-gray-100 h-6 rounded-sm'> 
                    <div style={{"width": getPercentStatBar(stat.base_stat)}} className='h-full w-1/2 bg-gradient-to-r from-yellow-300 to-yellow-500'></div>
                    </div>
                  </article>
                ) )
              }
            </section>
          </section>
        </article>
        

      </section>
    </section>
  )
}

export default PokemonId