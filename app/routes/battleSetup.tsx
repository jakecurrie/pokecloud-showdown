import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";

import PokemonSelectionGrid from "~/components/pokemonSelectionGrid";
import TrainerCard from "~/components/trainercard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { CollectionItemWithPokemon, getCollectionWithPokemonDetails } from "~/models/collections.server";
import { getAllTrainers, Trainer } from "~/models/trainers.server";
import { requireUserId } from "~/session.server";

interface BattleSetupProps {
  trainers: Trainer[];
  collection: CollectionItemWithPokemon[];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const userId = await requireUserId(request);
    const collection = await getCollectionWithPokemonDetails(userId);
    const trainers = await getAllTrainers();
    return json({
      trainers,
      collection
    });
  } catch (error) {
    return json({
      trainers: [],
      collection: []
    });
  }
}

export default function BattleSetup() {
  const { trainers, collection } = useLoaderData<BattleSetupProps>();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<CollectionItemWithPokemon[]>([]);
  const navigate = useNavigate();

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
  };

  const handlePokemonSelectionChange = (selectedPokemon: CollectionItemWithPokemon[]) => {
    setSelectedPokemon(selectedPokemon);
  };

  const handleStartBattle = () => {
    if (selectedTrainer && selectedPokemon.length === 5) {
      navigate('/battle', { state: { selectedTrainer, selectedPokemon } });
    }
  };

  return (
    <div>
      <h2>Select a Trainer to Battle</h2>
      <div className="max-w-screen-lg mx-auto">
        <Carousel
          orientation="vertical"
          opts={{
            align: "start",
          }}
          className="w-full max-w-xs"
        >
          <CarouselContent className="-mt-1 h-[300px]">
            {trainers.map((trainer) => (
              <CarouselItem key={trainer.id} className="pt-1">
                <div
                  onClick={() => handleSelectTrainer(trainer)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectTrainer(trainer)}
                  role="button"
                  tabIndex={0}
                >
                  <TrainerCard
                    name={trainer.name}
                    imageURL={trainer.imageURL}
                    type={trainer.type}
                    difficulty={trainer.difficulty}
                    details={trainer.details}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full" />
          <CarouselNext className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full" />
        </Carousel>
      </div>
      {selectedTrainer && (
        <div>
          <h3>Selected Trainer: {selectedTrainer.name}</h3>
          <h4>Select up to 5 Pokémon for Battle</h4>
          <PokemonSelectionGrid collection={collection} onSelectionChange={handlePokemonSelectionChange} />
          {selectedPokemon.length === 5 && (
            <button onClick={handleStartBattle}>Start Battle</button>
          )}
        </div>
      )}
    </div>
  );
}
