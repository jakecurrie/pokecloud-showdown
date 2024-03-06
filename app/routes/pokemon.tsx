import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getAllPokemon, Pokemon } from '~/models/pokemon.server';

export const loader: LoaderFunction = async () => {
  const pokemonList = await getAllPokemon();
  return json({ pokemonList });
};

export default function PokemonPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-800 p-4 text-white">
        <h1 className="text-3xl font-bold">Pokémon</h1>
      </header>

      <main className="p-4">
        {data.pokemonList.length === 0 ? (
          <p>No Pokémon found</p>
        ) : (
          <ul>
            {data.pokemonList.map((pokemon: Pokemon) => (
              <li key={pokemon.id} className="border-b p-2">
                <Link to={`/pokemon/${pokemon.id}`} className="text-blue-500">
                  {pokemon.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}




