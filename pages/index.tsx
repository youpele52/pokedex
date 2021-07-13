import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/Link'
import Image from 'next/image'

// Static page
export default function Home({ pokemon }) {
  // console.log(pokemon)
  return (
    <Layout title='Pokedex'>
      <h1 className='text-4xl text-center mb-8'>Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => {
          return (
            <li key={index}>
              <Link href={`/pokemon/${index + 1}`}>
                <a
                  className='border p-4 border-gray-200 my-2 capitalize flex items-center text-lg bg-gray-200 rounded-3xl '
                  href={pokeman.url}
                >
                  <img
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
    console.log(results)
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
