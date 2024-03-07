import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import PokemonCard from '~/components/pokecard';
import { getCollectionWithPokemonDetails, CollectionItemWithPokemon } from '~/models/collections.server';
import { requireUserId } from '~/session.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const userId = await requireUserId(request);
    const collection = await getCollectionWithPokemonDetails(userId);
    return json({ collection });
  } catch (error) {
    return json({ collection: [] });
  }
};

export default function Collections() {
  const { collection } = useLoaderData<{ collection: CollectionItemWithPokemon[]}>();

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-screen-lg w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          {collection.map(({ id, pokemon }) => (
            <PokemonCard
              key={id}
              name={pokemon?.name || 'Unknown'}
              imageUrl={pokemon?.image_url || ''}
              type={pokemon?.type || 'Unknown'}
              hp={pokemon?.hp || 0}
              attack={pokemon?.attack || 'Unknown'}
              defense="yeah"
            />
          ))}
        </div>
      </div>
    </div>
  );
}







