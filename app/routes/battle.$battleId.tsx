import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useActionData } from "@remix-run/react";

import { getTrainerCollectionWithPokemonDetails } from "~/models/trainers.server";
import { requireUserId } from "~/session.server";
import { getPokemonById, Pokemon } from "~/models/pokemon.server";
import { createBattle, getBattleById } from "~/models/battle.server";
import PokemonCard from "~/components/pokecard";
import BattleComponent from "../components/battleDisplay";

interface BattleDetails {
  name: string;
  hp: number;
  attack: number;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { battleId } = params;
  const userId = await requireUserId(request);

  if (!battleId) {
    throw new Response("Battle ID is required", { status: 400 });
  }

  const battle = await getBattleById(userId, battleId);

  if (!battle) {
    throw new Response("Battle not found", { status: 404 });
  }

  return json({ battle });
};

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
  const trainerPokemon =
    await getTrainerCollectionWithPokemonDetails(trainerId);

  let trainerCollection: Pokemon[] = [];
  if (
    trainerPokemon[0].pokemon &&
    trainerPokemon[1].pokemon &&
    trainerPokemon[2].pokemon &&
    trainerPokemon[3].pokemon &&
    trainerPokemon[4].pokemon
  ) {
    trainerCollection = [
      trainerPokemon[0].pokemon,
      trainerPokemon[1].pokemon,
      trainerPokemon[2].pokemon,
      trainerPokemon[3].pokemon,
      trainerPokemon[4].pokemon,
    ];
  }

  let userCollection: Pokemon[] = [];

  if (poke1 && poke2 && poke3 && poke4 && poke5 && trainerCollection) {
    userCollection = [poke1, poke2, poke3, poke4, poke5];

    let trainerBattleCollection: BattleDetails[] = [];
    if (
      trainerPokemon[0].pokemon &&
      trainerPokemon[1].pokemon &&
      trainerPokemon[2].pokemon &&
      trainerPokemon[3].pokemon &&
      trainerPokemon[4].pokemon
    ) {
      trainerBattleCollection = [
        {
          name: trainerPokemon[0].pokemon.name,
          hp: trainerPokemon[0].pokemon.hp,
          attack: trainerPokemon[0].pokemon.hp / 2,
        },
        {
          name: trainerPokemon[1].pokemon.name,
          hp: trainerPokemon[1].pokemon.hp,
          attack: trainerPokemon[1].pokemon.hp / 2,
        },
        {
          name: trainerPokemon[2].pokemon.name,
          hp: trainerPokemon[2].pokemon.hp,
          attack: trainerPokemon[2].pokemon.hp / 2,
        },
        {
          name: trainerPokemon[3].pokemon.name,
          hp: trainerPokemon[3].pokemon.hp,
          attack: trainerPokemon[3].pokemon.hp / 2,
        },
        {
          name: trainerPokemon[4].pokemon.name,
          hp: trainerPokemon[4].pokemon.hp,
          attack: trainerPokemon[4].pokemon.hp / 2,
        },
      ];
    }

    let userBattleCollection: BattleDetails[] = [];

    if (poke1 && poke2 && poke3 && poke4 && poke5 && trainerBattleCollection) {
      userBattleCollection = [
        { name: poke1.name, hp: poke1.hp, attack: poke1.hp / 2 },
        { name: poke2.name, hp: poke2.hp, attack: poke2.hp / 2 },
        { name: poke3.name, hp: poke3.hp, attack: poke3.hp / 2 },
        { name: poke4.name, hp: poke4.hp, attack: poke4.hp / 2 },
        { name: poke5.name, hp: poke5.hp, attack: poke5.hp / 2 },
      ];

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
      battleId: battleId,
      userBattleCollection: userBattleCollection,
      trainerBattleCollection: trainerBattleCollection,
    });
  }
};

export default function BattleTrainerId() {
  const actionData = useActionData<typeof action>();

  return (
    <div>
      <h4>YOUR POKEMON:</h4>
      <div className={"grid grid-cols-5 w-1/2"}>
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
      <div className={"grid grid-cols-5 w-1/2"}>
        <PokemonCard
          name={actionData.trainerCollection[0].name}
          imageUrl={actionData.trainerCollection[0].image_url}
          type={actionData.trainerCollection[0].type}
          hp={actionData.trainerCollection[0].hp}
          attack={actionData.trainerCollection[0].attack}
        />
        <PokemonCard
          name={actionData.trainerCollection[1].name}
          imageUrl={actionData.trainerCollection[1].image_url}
          type={actionData.trainerCollection[1].type}
          hp={actionData.trainerCollection[1].hp}
          attack={actionData.trainerCollection[1].attack}
        />
        <PokemonCard
          name={actionData.trainerCollection[2].name}
          imageUrl={actionData.trainerCollection[2].image_url}
          type={actionData.trainerCollection[2].type}
          hp={actionData.trainerCollection[2].hp}
          attack={actionData.trainerCollection[2].attack}
        />{" "}
        <PokemonCard
          name={actionData.trainerCollection[3].name}
          imageUrl={actionData.trainerCollection[3].image_url}
          type={actionData.trainerCollection[3].type}
          hp={actionData.trainerCollection[3].hp}
          attack={actionData.trainerCollection[3].attack}
        />{" "}
        <PokemonCard
          name={actionData.trainerCollection[4].name}
          imageUrl={actionData.trainerCollection[4].image_url}
          type={actionData.trainerCollection[4].type}
          hp={actionData.trainerCollection[4].hp}
          attack={actionData.trainerCollection[4].attack}
        />
      </div>
      <BattleComponent
        enemyTeam={actionData.trainerBattleCollection}
        playerTeam={actionData.userBattleCollection}
        battleId={actionData.battleId}
      />
      <Outlet />
    </div>
  );
}
