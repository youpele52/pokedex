import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'

// server side rendered page
export default function Pokeman({ pokeman }) {
  // console.log(pokeman)
  return (
    <Layout title={pokeman.name.toUpperCase()}>
      <h1 className='text-4xl font-bold mb-2 text-center capitalize'>
        {pokeman.name}
      </h1>
      <img
        className='mx-auto image-rotate '
        src={pokeman.image}
        alt={pokeman.name}
      />
      <div className='grid grid-cols-2 m-2 justify-items-center  '>
        <div className=''>
          <div className='font-bold mr-2'>
            Type
            <span className='font-light capitalize mr-2'>
              {pokeman.types.map((type, index) => (
                <p key={index}>{type.type.name}</p>
              ))}
            </span>
          </div>
        </div>
        <div className=''>
          <div className='font-bold mr-2'>
            Abilities
            <span className='font-light capitalize mr-2'>
              {pokeman.abilities.map((ability, index) => (
                <p key={index}>{ability.ability.name}</p>
              ))}
            </span>
          </div>
        </div>
        <div className='mb-5'>
          <div className='font-bold mr-2'>
            <div>Weight</div>
            <span className='font-light mr-2'>{pokeman.weight} Kg</span>
          </div>
        </div>
        <div className=''>
          <div className='font-bold mr-2'>
            <div>Height</div>
            <span className='font-light mr-2'>{pokeman.height}0 cm</span>
          </div>
        </div>
      </div>

      <p className='mt-10 text-center'>
        <Link href='/'>
          <a className='text-2xl underline hover:text-green-600 hover:scale-125 hover:font-bold'>
            Home
          </a>
        </Link>
      </p>
    </Layout>
  )
}

// nextjs has severside rendering and static rendering
// this is used for rendering severside page
export const getServerSideProps = async ({ params }) => {
  const id = params.id
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokeman = await res.json()
    const paddedId = ('00' + id).slice(-3)
    // adding image to the object pokemon
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`
    return {
      props: { pokeman },
    }
  } catch (err) {
    console.error(err)
  }
}
