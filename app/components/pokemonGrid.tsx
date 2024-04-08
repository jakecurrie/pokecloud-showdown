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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { collection, userId } = useLoaderData<{
    collection: CollectionItemWithPokemon[];
    userId: `email#${string}`;
  }>();

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 justify-center">
      {collection.map(({ userId, cardId, pokemon }) => (
        <PokemonCard
          key={`${userId}#${cardId}`}
          name={pokemon?.name || "Unknown"}
          imageUrl={pokemon?.image_url || ""}
          type={pokemon?.type || "Unknown"}
          hp={pokemon?.hp || 0}
          attack={pokemon?.attack || "Unknown"}
        />
      ))}
    </div>
  );
}
