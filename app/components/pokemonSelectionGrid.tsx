import { useState } from "react";

import PokemonCard from "~/components/pokecard";
import { CollectionItemWithPokemon } from "~/models/collections.server";

interface PokemonSelectionGridProps {
  collection: CollectionItemWithPokemon[];
}

export default function PokemonSelectionGrid({ collection }: PokemonSelectionGridProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelectPokemon = (userId: string, cardId: string) => {
    const key = `${userId}#${cardId}`;
    if (selectedItems.has(key)) {
      const newSelectedItems = new Set(selectedItems);
      newSelectedItems.delete(key);
      setSelectedItems(newSelectedItems);
    } else if (selectedItems.size < 5) {
      const newSelectedItems = new Set(selectedItems);
      newSelectedItems.add(key);
      setSelectedItems(newSelectedItems);
    }
  };

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full px-4 h-2/3 overflow-y-scroll scroll">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          {collection.map(({ userId, cardId, pokemon }) => (
            <div
              key={`${userId}#${cardId}`}
              onClick={() => handleSelectPokemon(userId, cardId)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelectPokemon(userId, cardId)}
              role="button"
              tabIndex={0}
              className={`cursor-pointer p-1 ${selectedItems.has(`${userId}#${cardId}`) ? "border-2 border-blue-500 rounded" : ""}`}
            >
              {pokemon && (
                <PokemonCard
                  name={pokemon.name || "Unknown"}
                  imageUrl={pokemon.image_url || ""}
                  type={pokemon.type || "Unknown"}
                  hp={pokemon.hp || 0}
                  attack={pokemon.attack || "Unknown"}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



