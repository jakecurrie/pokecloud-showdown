import { useState } from "react";

import PokemonCard from "~/components/pokecard";
import { CollectionItemWithPokemon } from "~/models/collections.server";

interface PokemonSelectionGridProps {
  collection: CollectionItemWithPokemon[];
  onSelectionChange: (selectedPokemon: CollectionItemWithPokemon[]) => void;
}

export default function PokemonSelectionGrid({
  collection,
  onSelectionChange,
}: PokemonSelectionGridProps) {
  const [selectedPokemonIds, setSelectedPokemonIds] = useState<string[]>([]);

  const handleSelectPokemon = (pokemonId: string) => {
    let newSelectedPokemonIds: string[];
    if (selectedPokemonIds.includes(pokemonId)) {
      newSelectedPokemonIds = selectedPokemonIds.filter(
        (id) => id !== pokemonId,
      );
    } else if (selectedPokemonIds.length < 5) {
      newSelectedPokemonIds = [...selectedPokemonIds, pokemonId];
    } else {
      return;
    }

    setSelectedPokemonIds(newSelectedPokemonIds);
    const selectedPokemon = collection.filter((item) =>
      newSelectedPokemonIds.includes(item.cardId),
    );
    onSelectionChange(selectedPokemon);
  };

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full px-4 h-2/3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          {collection.map(({ userId, cardId, pokemon }) => (
            <div
              key={`${userId}#${cardId}`}
              onClick={() => handleSelectPokemon(cardId)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSelectPokemon(cardId)
              }
              role="button"
              tabIndex={0}
              className={`cursor-pointer p-1 ${
                selectedPokemonIds.includes(cardId)
                  ? "border-2 border-blue-500 rounded"
                  : ""
              }`}
            >
              {pokemon ? (
                <PokemonCard
                  name={pokemon.name || "Unknown"}
                  imageUrl={pokemon.image_url || ""}
                  type={pokemon.type || "Unknown"}
                  hp={pokemon.hp || 0}
                  attack={pokemon.attack || "Unknown"}
                />
              ) : (
                <div>Missing Pokemon Data</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
