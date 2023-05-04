import React from 'react'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
   
   const handleSubmit = (e) =>{
      e.preventDefault()

      dispatch(setNameTrainer(e.target.nameTrainer.value))
      navigate("/pokedex")
   }



  return (
    <section className="min-h-screen grid grid-rows-[1fr_auto]  text-center">
        {/* PARTE SUPERIOR */}
       <section className='grid place-items-center'>
        <article >
            <div >
                <img src="/images/pokedex.png" alt="" />
            </div>
            <h2 className='font-bold text-5xl text-red-600 mt-8'>Hello trainer!</h2>
            <p className='font-semibold text-xl'>give your name to start:</p>
            <form onSubmit={handleSubmit}>
                <input id="nameTrainer" type="text" placeholder='Your name...' className='border-gray-500 mt-6 shadow-md px-10 py-1 rounded-sm'/>
                <button className='bg-red-600 px-10 py-1 text-white rounded-sm '>Start</button>
            </form>
        </article>
       </section>

      
      {/* FOOTER */}
      <Footer />

    </section>
  )
}

export default Home
