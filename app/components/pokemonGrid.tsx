import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import PokemonCard from "~/components/pokecard";
import {
  CollectionItemWithPokemon,
  getCollectionWithPokemonDetails,
} from "~/models/collections.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const userId = await requireUserId(request);
    const collection = await getCollectionWithPokemonDetails(userId);
    return json({ collection, userId });
  } catch (error) {
    return json({ collection: [] });
  }
};

export default function PokemonGrid() {
  const { collection, userId } = useLoaderData<{
    collection: CollectionItemWithPokemon[];
    userId: `email#${string}`;
  }>();

  console.log(collection);
  console.log(userId);

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full px-4 h-2/3 overflow-y-scroll scroll">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          {collection.map(({ id, pokemon }) => (
            <PokemonCard
              key={id}
              name={pokemon?.name || "Unknown"}
              imageUrl={pokemon?.image_url || ""}
              type={pokemon?.type || "Unknown"}
              hp={pokemon?.hp || 0}
              attack={pokemon?.attack || "Unknown"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
