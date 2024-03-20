import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, useLocation, redirect } from "@remix-run/react";
import { useEffect, useState } from "react";

import PokemonCard from "~/components/pokecard";
import { CollectionItemWithPokemon } from "~/models/collections.server";
import {
  getTrainerCollectionWithPokemonDetails,
  Trainer,
  TrainerCollectionItemWithPokemon,
} from "~/models/trainers.server";
import { createBattle } from "~/models/battle.server";

interface BattlePageState {
  selectedTrainer: Trainer;
  selectedPokemon: CollectionItemWithPokemon[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const trainerId = params.trainerId;

  if (!trainerId) {
    throw new Response("Trainer ID is required", { status: 400 });
  }

  const trainerCollection = await getTrainerCollectionWithPokemonDetails(
    `email#${trainerId}`
  );
  return json({ trainerCollection });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  console.log("Form Data:", Object.fromEntries(formData));
  const userId = formData.get("userId");
  const battleId = formData.get("battleId");
  const won = parseInt(formData.get("won") as string);

  if (!userId || !battleId || isNaN(won)) {
    return json({ error: "Invalid battle data" }, { status: 400 });
  }

  await createBattle({
    userId: userId as string,
    battleId: battleId as string,
    trainerId: params.trainerId as string,
    won,
  });

  return json({ success: true });
};

export default function BattleTrainerId() {
  const { trainerCollection } = useLoaderData<{
    trainerCollection: TrainerCollectionItemWithPokemon[];
  }>();
  const location = useLocation();
  const { selectedTrainer, selectedPokemon } = location.state as BattlePageState;
  const [trainerPokemon, setTrainerPokemon] = useState<TrainerCollectionItemWithPokemon[]>(
    trainerCollection
  );

  useEffect(() => {
    if (!selectedTrainer) {
      throw redirect("/battle");
    }
  }, [selectedTrainer]);

  return (
    <div className="battle-page">
      <h2>Battle Page</h2>
      <div className="trainer-section">
        <h3>Trainer: {selectedTrainer?.name}</h3>
        <div className="pokemon-list">
          {trainerPokemon.map((item, index) => (
            <PokemonCard
              key={index}
              name={item.pokemon?.name || "Unknown"}
              imageUrl={item.pokemon?.image_url || ""}
              type={item.pokemon?.type || "Unknown"}
              hp={item.pokemon?.hp || 0}
              attack={item.pokemon?.attack || "Unknown"}
            />
          ))}
        </div>
      </div>
      <div className="player-section">
        <h4>Your Selected Pokémon:</h4>
        <div className="pokemon-list">
          {selectedPokemon.map((item, index) => (
            <PokemonCard
              key={index}
              name={item.pokemon?.name || "Unknown"}
              imageUrl={item.pokemon?.image_url || ""}
              type={item.pokemon?.type || "Unknown"}
              hp={item.pokemon?.hp || 0}
              attack={item.pokemon?.attack || "Unknown"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



