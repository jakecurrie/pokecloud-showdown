import { ActionFunction, json } from "@remix-run/node";
import { redirect, useActionData } from "@remix-run/react";

import { getTrainerCollectionWithPokemonDetails } from "~/models/trainers.server";
import { requireUserId } from "~/session.server";
import { getPokemonById, Pokemon } from "~/models/pokemon.server";
import { createBattle } from "~/models/battle.server";

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
    </div>
  );
}
