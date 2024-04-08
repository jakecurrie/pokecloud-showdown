import {
  json,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Button from "~/components/button";
import GameStats from "~/components/gameStats";
import NavBar from "~/components/navBar";
import { getBattleStatsByUserId } from "~/models/battle.server";
import {
  CollectionItemWithPokemon,
  getCollectionWithPokemonDetails,
} from "~/models/collections.server";
import { requireUserId } from "~/session.server";

import homePic from "../../public/images/battle.jpg";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const battleStats = await getBattleStatsByUserId(userId);
  const collection = await getCollectionWithPokemonDetails(userId);
  return json({
    userId,
    battleStats,
    collection,
  });
};

export default function Home() {
  const { userId, collection, battleStats } = useLoaderData<{
    userId: `email#${string}`;
    battleStats: { wins: number; losses: number; currentWinStreak: number };
    collection: CollectionItemWithPokemon[];
  }>();

  const wins = battleStats.wins;
  const losses = battleStats.losses;
  const currentWinStreak = battleStats.currentWinStreak;
  let totalBattles: number;
  if (wins + losses > 0) {
    totalBattles = wins + losses;
  } else {
    totalBattles = 1;
  }

  return (
    <div className="bg-biceblue">
      <div className="absolute inset-0 h-screen">
        <NavBar />
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative top-20 border border-t-4 border-charcoal">
          <img
            className="absolute inset-0 blur-sm w-full h-full object-cover"
            src={homePic}
            alt=""
          />
          <div className="absolute top-1/4 w-full flex justify-evenly">
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
