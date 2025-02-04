import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Outlet, redirect, useActionData } from "@remix-run/react";

import PokemonCard from "~/components/pokecard";
import { createBattle, getBattleById } from "~/models/battle.server";
import { getPokemonById, Pokemon } from "~/models/pokemon.server";
import { getTrainerCollectionWithPokemonDetails } from "~/models/trainers.server";
import { requireUserId } from "~/session.server";

import homePic from "../../public/images/battle.jpg";
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
  const difficulty = +battleData.difficulty;

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
          attack: (3 * trainerPokemon[0].pokemon.hp) / 4,
        },
        {
          name: trainerPokemon[1].pokemon.name,
          hp: trainerPokemon[1].pokemon.hp,
          attack: (3 * trainerPokemon[1].pokemon.hp) / 4,
        },
        {
          name: trainerPokemon[2].pokemon.name,
          hp: trainerPokemon[2].pokemon.hp,
          attack: (3 * trainerPokemon[2].pokemon.hp) / 4,
        },
        {
          name: trainerPokemon[3].pokemon.name,
          hp: trainerPokemon[3].pokemon.hp,
          attack: (3 * trainerPokemon[3].pokemon.hp) / 4,
        },
        {
          name: trainerPokemon[4].pokemon.name,
          hp: trainerPokemon[4].pokemon.hp,
          attack: (3 * trainerPokemon[4].pokemon.hp) / 4,
        },
      ];
    }

    let userBattleCollection: BattleDetails[] = [];

    if (poke1 && poke2 && poke3 && poke4 && poke5 && trainerBattleCollection) {
      userBattleCollection = [
        { name: poke1.name, hp: poke1.hp, attack: (3 * poke1.hp) / 4 },
        { name: poke2.name, hp: poke2.hp, attack: (3 * poke2.hp) / 4 },
        { name: poke3.name, hp: poke3.hp, attack: (3 * poke3.hp) / 4 },
        { name: poke4.name, hp: poke4.hp, attack: (3 * poke4.hp) / 4 },
        { name: poke5.name, hp: poke5.hp, attack: (3 * poke5.hp) / 4 },
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
      difficulty: difficulty,
    });
  }
};

export default function BattleTrainerId() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="bg-biceblue h-screen flex justify-center">
      <p className="text-white text-3xl">
        DO NOT LEAVE THIS PAGE! Leaving this page will result in a loss!
      </p>
      <div className="absolute inset-0 h-screen">
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative border border-t-4 top-20 border-charcoal">
          <img
            className="absolute inset-0 blur-sm w-full h-full object-cover"
            src={homePic}
            alt=""
          />
          <div
            className={
              "absolute left-8 top-36 bg-honeydew rounded-3xl text-onyx border-4 border-onyx p-4 pb-24"
            }
          >
            <BattleComponent
              enemyTeam={actionData.trainerBattleCollection}
              playerTeam={actionData.userBattleCollection}
              battleId={actionData.battleId}
              difficulty={+actionData.difficulty}
            />
          </div>
          <div className="absolute w-2/3 right-14 top-4 flex flex-col justify-evenly items-center content-center h-2/3">
            <div className="flex flex-col justify-evenly items-center content-center w-5/6">
              <div className="bg-honeydew rounded-3xl text-onyx border-4 border-onyx">
                <h4 className={"p-2 text-xl"}>YOUR POKEMON:</h4>
              </div>
              <div className={"flex justify-evenly w-full"}>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.userCollection[0].name}
                    imageUrl={actionData.userCollection[0].image_url}
                    type={actionData.userCollection[0].type}
                    hp={actionData.userCollection[0].hp}
                    attack={actionData.userCollection[0].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.userCollection[1].name}
                    imageUrl={actionData.userCollection[1].image_url}
                    type={actionData.userCollection[1].type}
                    hp={actionData.userCollection[1].hp}
                    attack={actionData.userCollection[1].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.userCollection[2].name}
                    imageUrl={actionData.userCollection[2].image_url}
                    type={actionData.userCollection[2].type}
                    hp={actionData.userCollection[2].hp}
                    attack={actionData.userCollection[2].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.userCollection[3].name}
                    imageUrl={actionData.userCollection[3].image_url}
                    type={actionData.userCollection[3].type}
                    hp={actionData.userCollection[3].hp}
                    attack={actionData.userCollection[3].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.userCollection[4].name}
                    imageUrl={actionData.userCollection[4].image_url}
                    type={actionData.userCollection[4].type}
                    hp={actionData.userCollection[4].hp}
                    attack={actionData.userCollection[4].attack}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-evenly items-center content-center w-5/6">
              <div
                className={
                  "bg-honeydew rounded-3xl text-onyx border-4 border-onyx"
                }
              >
                <h4 className={"p-2 text-xl"}>TRAINER POKEMON:</h4>
              </div>
              <div className={"flex justify-evenly w-full"}>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.trainerCollection[0].name}
                    imageUrl={actionData.trainerCollection[0].image_url}
                    type={actionData.trainerCollection[0].type}
                    hp={actionData.trainerCollection[0].hp}
                    attack={actionData.trainerCollection[0].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.trainerCollection[1].name}
                    imageUrl={actionData.trainerCollection[1].image_url}
                    type={actionData.trainerCollection[1].type}
                    hp={actionData.trainerCollection[1].hp}
                    attack={actionData.trainerCollection[1].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.trainerCollection[2].name}
                    imageUrl={actionData.trainerCollection[2].image_url}
                    type={actionData.trainerCollection[2].type}
                    hp={actionData.trainerCollection[2].hp}
                    attack={actionData.trainerCollection[2].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.trainerCollection[3].name}
                    imageUrl={actionData.trainerCollection[3].image_url}
                    type={actionData.trainerCollection[3].type}
                    hp={actionData.trainerCollection[3].hp}
                    attack={actionData.trainerCollection[3].attack}
                  />
                </div>
                <div className="p-4">
                  <PokemonCard
                    name={actionData.trainerCollection[4].name}
                    imageUrl={actionData.trainerCollection[4].image_url}
                    type={actionData.trainerCollection[4].type}
                    hp={actionData.trainerCollection[4].hp}
                    attack={actionData.trainerCollection[4].attack}
                  />
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
