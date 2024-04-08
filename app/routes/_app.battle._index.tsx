import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import NavBar from "~/components/navBar";
import PokemonSelectionGrid from "~/components/pokemonSelectionGrid";
import TrainerCard from "~/components/trainercard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  CollectionItemWithPokemon,
  getCollectionWithPokemonDetails,
} from "~/models/collections.server";
import { getAllTrainers, Trainer } from "~/models/trainers.server";
import { requireUserId } from "~/session.server";

import homePic from "../../public/images/battle.jpg";

interface BattleSetupProps {
  trainers: Trainer[];
  collection: CollectionItemWithPokemon[];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const userId = await requireUserId(request);
    const collection = await getCollectionWithPokemonDetails(userId);
    const trainers = await getAllTrainers();
    console.log("Loader: Successfully loaded trainers and collection");
    return json({
      trainers,
      collection,
    });
  } catch (error) {
    console.error("Loader Error:", error);
    return json(
      {
        trainers: [],
        collection: [],
      },
      { status: 500 },
    );
  }
};

export default function BattleSetup() {
  const { trainers, collection } = useLoaderData<BattleSetupProps>();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<
    CollectionItemWithPokemon[]
  >([]);

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    console.log("Selected Trainer:", trainer);
  };

  const handlePokemonSelectionChange = (
    selectedPokemon: CollectionItemWithPokemon[],
  ) => {
    setSelectedPokemon(selectedPokemon);
    console.log("Selected Pokémon:", selectedPokemon);
  };

  const battleId = Date.now();

  return (
    <div className="bg-biceblue">
      <div className="absolute inset-0 h-screen">
        <NavBar />
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative border border-t-4 top-20 border-charcoal">
          <img
            className="absolute inset-0 blur-sm w-full h-full object-cover"
            src={homePic}
            alt=""
          />
          <div
            className={
              "absolute w-1/2 top-14 flex flex-col items-center content-center"
            }
          >
            <div className="bg-honeydew rounded-3xl text-onyx border-4 border-onyx">
              <h3 className={"p-4 text-xl"}>Select a Trainer to Battle</h3>
            </div>
            <div className="p-12">
              <Carousel
                orientation="vertical"
                opts={{
                  align: "start",
                }}
                className="w-full max-w-xs"
              >
                <CarouselContent className="-mt-1 h-[300px]">
                  {trainers.map((trainer) => (
                    <CarouselItem key={trainer.id} className="mt-0.5 p-1">
                      <div
                        onClick={() => handleSelectTrainer(trainer)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSelectTrainer(trainer)
                        }
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
          </div>
          <Form method="post" action={`/battle/${battleId}`}>
            <div
              className={
                "absolute right-14 w-1/2 top-6 flex flex-col items-center content-center"
              }
            >
              <div className="bg-honeydew rounded-3xl text-onyx border-4 border-onyx items-center">
                <h3 className={"pt-4 px-4 text-xl"}>
                  Selected Trainer: {selectedTrainer?.name}
                </h3>
                <h4 className={"pb-4 px-4 text-xl"}>
                  Select up to 5 Pokémon for Battle
                </h4>
              </div>
              <div className={"pt-4 h-96 overflow-y-scroll scroll"}>
                <PokemonSelectionGrid
                  collection={collection}
                  onSelectionChange={handlePokemonSelectionChange}
                />
              </div>
              {selectedPokemon.map((pokemon, index) => (
                <div key={index}>
                  <input
                    type="hidden"
                    name={`pokemonId${index + 1}`}
                    value={pokemon.pokemon?.id}
                  />
                </div>
              ))}
              {selectedPokemon.length === 5 && selectedTrainer && (
                <button
                  className={
                    "bg-honeydew rounded-3xl text-onyx border-4 border-onyx"
                  }
                  type="submit"
                >
                  <h3 className={"p-4 text-xl"}>Start Battle</h3>
                </button>
              )}
              <input type="hidden" name={`battleId`} value={battleId} />
              <input
                type="hidden"
                name={`trainerId`}
                value={selectedTrainer?.id}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
