import React from 'react'
import Layout from '../../components/Layout'
import Link from 'next/Link'

// server side rendered page
export default function Pokeman({ pokeman }) {
  // console.log(pokeman)
  return (
    <Layout title={pokeman.name.toUpperCase()}>
      <h1 className='text-4xl mb-2 text-center capitalize'>{pokeman.name}</h1>
      <img className='mx-auto' src={pokeman.image} alt={pokeman.name} />
      <p>
        <span className='font-bold mr-2'>Weight:</span> {pokeman.weight}
      </p>
      <p>
        <span className='font-bold mr-2'>Height:</span>
        {pokeman.height}
      </p>
      <h2 className='text-2xl mt-6 mb-2'>Types</h2>
      {pokeman.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
      ))}
      <p className='mt-10 text-center'>
        <Link href='/'>
          <a className='text-2xl underline'>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

// nextjs has severside rendering and static rendering
// this is used for rendering severside page
export const getServerSideProps = async ({ query }) => {
  const id = query.id

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
