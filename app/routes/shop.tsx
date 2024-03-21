import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";

import CardPack from "~/components/cardPack";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  CardBundle,
  generateCardBundle,
  getBundleTiersConstant,
  Rarity,
} from "~/models/shop.server";
import { requireUserId } from "~/session.server";
import homePic from "../../public/images/battle.jpg";
import logoPic from "../../public/images/logo.png";
import GameStats from "~/components/gameStats";
import { getBalance } from "~/models/pokecoins.server";
import { useState } from "react";
import { getBattleStatsByUserId } from "~/models/battle.server";
import {
  CollectionItemWithPokemon,
  getCollectionWithPokemonDetails,
} from "~/models/collections.server";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const availablePokecoins = await getBalance(userId);
  const bundleTiers = getBundleTiersConstant();
  const battleStats = await getBattleStatsByUserId(userId);
  const collection = await getCollectionWithPokemonDetails(userId);
  const bundles: CardBundle[] = [];
  for (let tier = 1; tier <= 4; tier++) {
    const bundle = await generateCardBundle(tier);
    bundles.push(bundle);
  }
  return json({
    bundles,
    userId,
    availablePokecoins,
    bundleTiers,
    battleStats,
    collection,
  });
};

// export async function action({ request }: ActionFunctionArgs) {
//   const userId = await requireUserId(request);
//   const formData = await request.formData();
//   const cardData = Object.fromEntries(formData);
//   const price = -+cardData.price;
//
//   await changeBalance(userId, price);
//
//   await addCollectionItem({
//     cardId: cardData.card1.toString(),
//     userId: userId,
//   });
//   await addCollectionItem({
//     cardId: cardData.card2.toString(),
//     userId: userId,
//   });
//   await addCollectionItem({
//     cardId: cardData.card3.toString(),
//     userId: userId,
//   });
//   await addCollectionItem({
//     cardId: cardData.card4.toString(),
//     userId: userId,
//   });
//   await addCollectionItem({
//     cardId: cardData.card5.toString(),
//     userId: userId,
//   });
//   return redirect("/collections");
// }

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [parentDialogDisabled, setParentDialogDisabled] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/collections";

  const {
    bundles,
    userId,
    availablePokecoins,
    bundleTiers,
    battleStats,
    collection,
  } = useLoaderData<{
    bundles: CardBundle[];
    userId: `email#${string}`;
    availablePokecoins: number;
    bundleTiers: {
      tier: number;
      price: number;
      distribution: Record<Rarity, number>;
      description: string;
    }[];
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

  const handlePurchaseClick = () => {
    // Disable the parent dialog
    document.getElementById("something")?.blur();
  };

  return (
    <body className="bg-biceblue">
      <div>
        <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative border border-t-4 border-charcoal">
            <img
              className="absolute inset-0 blur-sm w-full h-full object-cover"
              src={homePic}
              alt=""
            />

            <img
              className="relative w-20 object-cover  m-4"
              src={logoPic}
              alt=""
            />

            <h4 className={"relative bg-honeydew p-4 w-auto inline"}>
              Available Pokecoins : {availablePokecoins}
            </h4>

            <div className="absolute right-4 top-4 w-64 h-10 bg-biceblue border border-charcoal text-honeydew text-center rounded-lg px-4 py-2 mb-4">
              <Link
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Logout
              </Link>
            </div>

            <div
              className="absolute top-1/4 w-full flex justify-evenly"
              id={"something"}
            >
              {bundles.map((bundle, index) => (
                <div key={index} className="w-48">
                  <AlertDialog>
                    <AlertDialogTrigger disabled={parentDialogDisabled}>
                      <div className="">
                        <CardPack
                          tier={bundle.tier}
                          commonChance={bundleTiers[index].distribution.Common}
                          uncommonChance={
                            bundleTiers[index].distribution.Uncommon
                          }
                          rareChance={bundleTiers[index].distribution.Rare}
                          legendaryChance={
                            bundleTiers[index].distribution.Legendary
                          }
                          epicChance={bundleTiers[index].distribution.Epic}
                          description={bundleTiers[index].description}
                        />
                        <div className="bg-honeydew rounded-3xl text-onyx border-4 border-onyx">
                          <h3>Tier {bundle.tier} Pack</h3>
                          <h2>Cost: {bundle.price} PokeCoins</h2>
                        </div>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <div>
                            Are you sure you want to purchase this TIER{" "}
                            {bundle.tier} pack?
                            <div className="w-16">
                              {/*<CardPack tier={bundle.tier} />*/}
                            </div>
                            <p>Price: {bundle.price} PokeCoins</p>
                          </div>
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        {bundle.price > availablePokecoins ? (
                          <div>
                            <AlertDialogAction
                              type={"submit"}
                              disabled={true}
                              className={
                                "bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
                              }
                            >
                              not enough pokecoins
                            </AlertDialogAction>
                          </div>
                        ) : (
                          <Form method={"post"} action={"/collections"}>
                            <input
                              type={"hidden"}
                              id={"price"}
                              name={"price"}
                              value={bundle.price}
                            />
                            <input
                              type={"hidden"}
                              id={"card1"}
                              name={"card1"}
                              value={bundle.cards[0].id}
                            />
                            <input
                              type={"hidden"}
                              id={"card2"}
                              name={"card2"}
                              value={bundle.cards[1].id}
                            />
                            <input
                              type={"hidden"}
                              id={"card3"}
                              name={"card3"}
                              value={bundle.cards[2].id}
                            />
                            <input
                              type={"hidden"}
                              id={"card4"}
                              name={"card4"}
                              value={bundle.cards[3].id}
                            />
                            <input
                              type={"hidden"}
                              id={"card5"}
                              name={"card5"}
                              value={bundle.cards[4].id}
                            />
                            <AlertDialogAction
                              type={"submit"}
                              onClick={() =>
                                setParentDialogDisabled((prev) => !prev)
                              }
                            >
                              {isSubmitting ? "Opening..." : "Purchase"}
                            </AlertDialogAction>
                          </Form>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
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
    </body>
  );
}
