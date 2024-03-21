import { ActionFunction, json } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";

import { getTrainerCollectionWithPokemonDetails } from "~/models/trainers.server";
import { requireUserId } from "~/session.server";
import { getPokemonById, Pokemon } from "~/models/pokemon.server";
import { createBattle } from "~/models/battle.server";
import PokemonCard from "~/components/pokecard";

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const battleData = Object.fromEntries(formData);

  const battleId = battleData.battleId as string;
  const trainerId = battleData.trainerId as `email#${string}`;

  if (!userId || !battleId) {
    return json({ error: "Invalid battle data" }, { status: 400 });
  }

  const poke1 = await getPokemonById(battleData.pokemonId1.toString());
  const poke2 = await getPokemonById(battleData.pokemonId2.toString());
  const poke3 = await getPokemonById(battleData.pokemonId3.toString());
  const poke4 = await getPokemonById(battleData.pokemonId4.toString());
  const poke5 = await getPokemonById(battleData.pokemonId5.toString());
  const trainerCollection =
    await getTrainerCollectionWithPokemonDetails(trainerId);

  let userCollection: Pokemon[] = [];

  if (poke1 && poke2 && poke3 && poke4 && poke5 && trainerCollection) {
    userCollection = [poke1, poke2, poke3, poke4, poke5];

    console.log("Creating battle");

    await createBattle({
      userId: userId as string,
      battleId: battleId as string,
      trainerId: trainerId as string,
      won: 0,
    });

    console.log("Created battle");
  }
  redirect(`/battle/${battleId}`);
  return json({
    userCollection: userCollection,
    trainerCollection: trainerCollection,
  });
};

export default function BattleTrainerId() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h1> Hello </h1>
      <h1>{actionData.trainerCollection[0].pokemon.name}</h1>
      <h1>{actionData.userCollection[0].name}</h1>

      <h4>YOUR POKEMON:</h4>
      <div className={"grid grid-cols-5"}>
        <PokemonCard
          name={actionData.userCollection[0].name}
          imageUrl={actionData.userCollection[0].image_url}
          type={actionData.userCollection[0].type}
          hp={actionData.userCollection[0].hp}
          attack={actionData.userCollection[0].attack}
        />
        <PokemonCard
          name={actionData.userCollection[1].name}
          imageUrl={actionData.userCollection[1].image_url}
          type={actionData.userCollection[1].type}
          hp={actionData.userCollection[1].hp}
          attack={actionData.userCollection[1].attack}
        />
        <PokemonCard
          name={actionData.userCollection[2].name}
          imageUrl={actionData.userCollection[2].image_url}
          type={actionData.userCollection[2].type}
          hp={actionData.userCollection[2].hp}
          attack={actionData.userCollection[2].attack}
        />
        <PokemonCard
          name={actionData.userCollection[3].name}
          imageUrl={actionData.userCollection[3].image_url}
          type={actionData.userCollection[3].type}
          hp={actionData.userCollection[3].hp}
          attack={actionData.userCollection[3].attack}
        />
        <PokemonCard
          name={actionData.userCollection[4].name}
          imageUrl={actionData.userCollection[4].image_url}
          type={actionData.userCollection[4].type}
          hp={actionData.userCollection[4].hp}
          attack={actionData.userCollection[4].attack}
        />
      </div>

      <h4>TRAINER POKEMON:</h4>
      <div className={"grid grid-cols-5"}>
        <PokemonCard
          name={actionData.trainerCollection[0].pokemon.name}
          imageUrl={actionData.trainerCollection[0].pokemon.image_url}
          type={actionData.trainerCollection[0].pokemon.type}
          hp={actionData.trainerCollection[0].pokemon.hp}
          attack={actionData.trainerCollection[0].pokemon.attack}
        />
        <PokemonCard
          name={actionData.trainerCollection[1].pokemon.name}
          imageUrl={actionData.trainerCollection[1].pokemon.image_url}
          type={actionData.trainerCollection[1].pokemon.type}
          hp={actionData.trainerCollection[1].pokemon.hp}
          attack={actionData.trainerCollection[1].pokemon.attack}
        />
        <PokemonCard
          name={actionData.trainerCollection[2].pokemon.name}
          imageUrl={actionData.trainerCollection[2].pokemon.image_url}
          type={actionData.trainerCollection[2].pokemon.type}
          hp={actionData.trainerCollection[2].pokemon.hp}
          attack={actionData.trainerCollection[2].pokemon.attack}
        />{" "}
        <PokemonCard
          name={actionData.trainerCollection[3].pokemon.name}
          imageUrl={actionData.trainerCollection[3].pokemon.image_url}
          type={actionData.trainerCollection[3].pokemon.type}
          hp={actionData.trainerCollection[3].pokemon.hp}
          attack={actionData.trainerCollection[3].pokemon.attack}
        />{" "}
        <PokemonCard
          name={actionData.trainerCollection[4].pokemon.name}
          imageUrl={actionData.trainerCollection[4].pokemon.image_url}
          type={actionData.trainerCollection[4].pokemon.type}
          hp={actionData.trainerCollection[4].pokemon.hp}
          attack={actionData.trainerCollection[4].pokemon.attack}
        />
      </div>
    </div>
  );
}
