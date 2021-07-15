import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'

// Static page
export default function Home({ pokemon }) {
  // console.log(pokemon)
  return (
    <Layout title='Pokedex'>
      <div className=' mb-8'>
        <h1 className='text-7xl  font-bold text-center'>
          <Image
            src='/Pokeball.svg'
            alt=''
            className='animate-bounce'
            height={100}
            width={100}
          />
          Pokedex
          <Image
            src='/Pokeball.svg'
            alt=''
            className='animate-bounce'
            height={100}
            width={100}
          />
        </h1>
      </div>
      <ul>
        {pokemon.map((pokeman, index) => {
          return (
            <li
              key={index}
              className='hover:font-bold hover:scale-125 hover:m-7 '
            >
              <Link href={`/pokemon/${index + 1}`}>
                <a
                  className='border p-4 border-gray-200 my-2 capitalize flex items-center text-lg bg-gray-200 rounded-3xl '
                  href={pokeman.url}
                >
                  <Image
                    height={100}
                    width={100}
                    className='w-20 h-20 mr-3'
                    src={pokeman.image}
                    alt={pokeman.name}
                  />
                  <span className='mr-2 font-bold'>{index + 1}</span>
                  {pokeman.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

// nextjs has severside rendering and static rendering
// this is used for rendering static pages
export async function getStaticProps(context) {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const { results } = await res.json()
    // console.log(results)
    const pokemon = results.map((pokeman, index) => {
      // originally the data from the api do not contain image
      // so here, image url for each of the pokeman's were dynamically created and added to our copy of the pokemon object
      // original object from api for each pokemon contains name and url (for abilities)
      // our copy contains name, url and image
      const paddedId = ('00' + (index + 1)).slice(-3)
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
      return { ...pokeman, image }
    })
    return {
      props: { pokemon },
    }
  } catch (error) {
    console.error(error)
  }
}
