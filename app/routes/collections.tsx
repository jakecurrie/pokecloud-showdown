import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

import Button from "~/components/button";
import GameStats from "~/components/gameStats";
import PokemonGrid from "~/components/pokemonGrid";
import PokemonCard from "~/components/pokecard";
import {
  addCollectionItem,
  CollectionItemWithPokemon,
  getCollectionWithPokemonDetails,
} from "~/models/collections.server";
import { requireUserId } from "~/session.server";

import homePic from "../../public/images/battle.jpg";
import logoPic from "../../public/images/logo.png";
import { changeBalance } from "~/models/pokecoins.server";
import { getPokemonById } from "~/models/pokemon.server";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { getBattleStatsByUserId } from "~/models/battle.server";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const userId = await requireUserId(request);
    const collection = await getCollectionWithPokemonDetails(userId);
    const battleStats = await getBattleStatsByUserId(userId);
    return json({ collection, userId, battleStats });
  } catch (error) {
    return json({ collection: [] });
  }
};

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const cardData = Object.fromEntries(formData);
  const price = -+cardData.price;
  const card1 = await getPokemonById(cardData.card1.toString());
  const card2 = await getPokemonById(cardData.card2.toString());
  const card3 = await getPokemonById(cardData.card3.toString());
  const card4 = await getPokemonById(cardData.card4.toString());
  const card5 = await getPokemonById(cardData.card5.toString());

  redirect("/collections");

  await changeBalance(userId, price);

  await addCollectionItem({
    cardId: cardData.card1.toString(),
    userId: userId,
  });
  await addCollectionItem({
    cardId: cardData.card2.toString(),
    userId: userId,
  });
  await addCollectionItem({
    cardId: cardData.card3.toString(),
    userId: userId,
  });
  await addCollectionItem({
    cardId: cardData.card4.toString(),
    userId: userId,
  });
  await addCollectionItem({
    cardId: cardData.card5.toString(),
    userId: userId,
  });

  return json({
    cardData: cardData,
    card1: card1,
    card2: card2,
    card3: card3,
    card4: card4,
    card5: card5,
  });
}

export default function Collections() {
  const { collection, userId, battleStats } = useLoaderData<{
    collection: CollectionItemWithPokemon[];
    userId: `email#${string}`;
    battleStats: { wins: number; losses: number; currentWinStreak: number };
  }>();

  const bundle = useActionData<typeof action>();

  const wins = battleStats.wins;
  const losses = battleStats.losses;
  const currentWinStreak = battleStats.currentWinStreak;
  let totalBattles: number;
  if (wins + losses > 0) {
    totalBattles = wins + losses;
  } else {
    totalBattles = 1;
  }

  console.log(bundle?.cardData);

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <div className="bg-biceblue">
      <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative border border-t-4 border-charcoal">
          <img
            className="absolute inset-0 blur-sm w-full h-full object-cover"
            src={homePic}
            alt=""
          />

          <img
            className="absolute w-20 object-cover  m-4"
            src={logoPic}
            alt=""
          />
          <div className="relative top-5 w-full flex justify-evenly">
            <div className="relative top-20 flex flex-col gap-4">
              <div>
                <Button name="BATTLE" clickURL="/battle" />
              </div>
              <div>
                <Button name="MY CARDS" clickURL="/collections" />
              </div>
              <div>
                <Button name="SHOP" clickURL="/shop" />
              </div>
            </div>
            <div className="max-w-screen-lg w-full px-4 h-96 overflow-y-scroll scroll">
              <PokemonGrid />
            </div>
            {bundle?.cardData ? (
              <AlertDialog defaultOpen={true}>
                <AlertDialogContent>
                  <AlertDialogTitle>
                    You added cards to your collection!
                  </AlertDialogTitle>
                  <div className={"grid grid-cols-3"}>
                    <div>
                      <PokemonCard
                        name={bundle.card1?.name || "Unknown"}
                        imageUrl={bundle.card1?.image_url || ""}
                        type={bundle.card1?.type || "Unknown"}
                        hp={bundle.card1?.hp || 0}
                        attack={bundle.card1?.attack || "Unknown"}
                      />
                    </div>
                    <div>
                      <PokemonCard
                        name={bundle.card2?.name || "Unknown"}
                        imageUrl={bundle.card2?.image_url || ""}
                        type={bundle.card2?.type || "Unknown"}
                        hp={bundle.card2?.hp || 0}
                        attack={bundle.card2?.attack || "Unknown"}
                      />
                    </div>
                    <div>
                      <PokemonCard
                        name={bundle.card3?.name || "Unknown"}
                        imageUrl={bundle.card3?.image_url || ""}
                        type={bundle.card3?.type || "Unknown"}
                        hp={bundle.card3?.hp || 0}
                        attack={bundle.card3?.attack || "Unknown"}
                      />
                    </div>
                    <div>
                      <PokemonCard
                        name={bundle.card4?.name || "Unknown"}
                        imageUrl={bundle.card4?.image_url || ""}
                        type={bundle.card4?.type || "Unknown"}
                        hp={bundle.card4?.hp || 0}
                        attack={bundle.card4?.attack || "Unknown"}
                      />
                    </div>
                    <div>
                      <PokemonCard
                        name={bundle.card5?.name || "Unknown"}
                        imageUrl={bundle.card5?.image_url || ""}
                        type={bundle.card5?.type || "Unknown"}
                        hp={bundle.card5?.hp || 0}
                        attack={bundle.card5?.attack || "Unknown"}
                      />
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <div></div>
            )}
          </div>
          <GameStats
            name={userId}
            wins={wins}
            losses={losses}
            winPercent={wins / totalBattles}
            winStreak={currentWinStreak}
            badges={0}
            pokemonCollected={collection.length}
          />
        </div>
      </div>
    </div>
  );
}
