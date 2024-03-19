import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Button from "~/components/button";
import GameStats from "~/components/gameStats";
import PokemonGrid from "~/components/pokemonGrid";
import {
  CollectionItemWithPokemon,
  getCollectionWithPokemonDetails,
} from "~/models/collections.server";
import { requireUserId } from "~/session.server";

import homePic from "../../public/images/battle.jpg";
import logoPic from "../../public/images/logo.png";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const userId = await requireUserId(request);
    const collection = await getCollectionWithPokemonDetails(userId);
    return json({ collection, userId });
  } catch (error) {
    return json({ collection: [] });
  }
};

export default function Collections() {
  const { collection, userId } = useLoaderData<{
    collection: CollectionItemWithPokemon[];
    userId: `email#${string}`;
  }>();

  if (!collection || collection.length === 0) {
    return <div>No collection items found.</div>;
  }

  return (
    <body className="bg-biceblue">
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
          </div>
          <GameStats />
        </div>
      </div>
    </body>
  );
}
