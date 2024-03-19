import {
  ActionFunctionArgs,
  json,
  LoaderFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, Link, useLoaderData, useSearchParams } from "@remix-run/react";

import CardPack from "~/components/cardPack";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { CardBundle, generateCardBundle } from "~/models/shop.server";
import { requireUserId } from "~/session.server";
import homePic from "../../public/images/battle.jpg";
import logoPic from "../../public/images/logo.png";
import GameStats from "~/components/gameStats";
import { addCollectionItem } from "~/models/collections.server";
import { changeBalance, getBalance } from "~/models/pokecoins.server";
import { useState } from "react";
import PokemonCard from "~/components/pokecard";
import { timeout } from "rxjs";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const availablePokecoins = await getBalance(userId);
  const bundles: CardBundle[] = [];
  for (let tier = 1; tier <= 4; tier++) {
    const bundle = await generateCardBundle(tier);
    bundles.push(bundle);
  }
  return json({ bundles, userId, availablePokecoins });
};

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const cardData = Object.fromEntries(formData);
  const price = -+cardData.price;

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
  return null;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [parentDialogDisabled, setParentDialogDisabled] = useState(false);

  const { bundles, userId, availablePokecoins } = useLoaderData<{
    bundles: CardBundle[];
    userId: `email#${string}`;
    availablePokecoins: number;
  }>();

  const handlePurchaseClick = () => {
    // Disable the parent dialog
    setParentDialogDisabled(true);
  };

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

          <div className="absolute top-1/4 w-full flex justify-evenly">
            {bundles.map((bundle, index) => (
              <div key={index} className="w-48">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="">
                      <CardPack tier={bundle.tier} />
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
                            <CardPack tier={bundle.tier} />
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
                        <AlertDialog>
                          <AlertDialogTrigger>
                            {parentDialogDisabled ? (
                              <AlertDialogAction
                                disabled={true}
                                className={
                                  "bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
                                }
                                onClick={handlePurchaseClick}
                              >
                                Purchase
                              </AlertDialogAction>
                            ) : (
                              <AlertDialogAction onClick={() => timeout(5000)}>
                                Purchase
                              </AlertDialogAction>
                            )}
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                You opened Cards!
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                <div className={"grid grid-cols-3"}>
                                  <div>
                                    <PokemonCard
                                      name={bundle.cards[0].name || "Unknown"}
                                      imageUrl={bundle.cards[0].image_url || ""}
                                      type={bundle.cards[0].type || "Unknown"}
                                      hp={bundle.cards[0].hp || 0}
                                      attack={
                                        bundle.cards[0].attack || "Unknown"
                                      }
                                    />
                                  </div>
                                  <div>
                                    <PokemonCard
                                      name={bundle.cards[1].name || "Unknown"}
                                      imageUrl={bundle.cards[1].image_url || ""}
                                      type={bundle.cards[1].type || "Unknown"}
                                      hp={bundle.cards[1].hp || 0}
                                      attack={
                                        bundle.cards[1].attack || "Unknown"
                                      }
                                    />
                                  </div>
                                  <div>
                                    <PokemonCard
                                      name={bundle.cards[2].name || "Unknown"}
                                      imageUrl={bundle.cards[2].image_url || ""}
                                      type={bundle.cards[2].type || "Unknown"}
                                      hp={bundle.cards[2].hp || 0}
                                      attack={
                                        bundle.cards[2].attack || "Unknown"
                                      }
                                    />
                                  </div>
                                  <div>
                                    <PokemonCard
                                      name={bundle.cards[3].name || "Unknown"}
                                      imageUrl={bundle.cards[3].image_url || ""}
                                      type={bundle.cards[3].type || "Unknown"}
                                      hp={bundle.cards[3].hp || 0}
                                      attack={
                                        bundle.cards[3].attack || "Unknown"
                                      }
                                    />
                                  </div>
                                  <div>
                                    <PokemonCard
                                      name={bundle.cards[4].name || "Unknown"}
                                      imageUrl={bundle.cards[4].image_url || ""}
                                      type={bundle.cards[4].type || "Unknown"}
                                      hp={bundle.cards[4].hp || 0}
                                      attack={
                                        bundle.cards[4].attack || "Unknown"
                                      }
                                    />
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <Form method={"post"} action={"/shop"}>
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
                                <AlertDialogAction type={"submit"}>
                                  Continue
                                </AlertDialogAction>
                              </Form>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
          <GameStats />
        </div>
      </div>
    </body>
  );
}
