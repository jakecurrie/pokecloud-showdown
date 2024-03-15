import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigate,
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
import { CardBundle, generateCardBundle } from "~/models/shop.server";
import { requireUserId } from "~/session.server";
import { useState } from "react";
import homePic from "../../public/images/battle.jpg";
import logoPic from "../../public/images/logo.png";
import GameStats from "~/components/gameStats";

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const bundles: CardBundle[] = [];
  for (let tier = 1; tier <= 4; tier++) {
    const bundle = await generateCardBundle(tier);
    bundles.push(bundle);
  }
  return json({ bundles, userId });
};

export default function Shop() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [selectedCards, setSelectedCards] = useState<CardBundle[]>([]); // State to hold selected cards

  const handleContinueClick = (bundle: CardBundle) => {
    setSelectedCards([...selectedCards, bundle]); // Add selected bundle to state
    navigate("/add_cards", {
      state: { selectedCards: [...selectedCards, bundle] },
    }); // Redirect with selectedCards in route state
  };

  const { bundles, userId } = useLoaderData<{
    bundles: CardBundle[];
    userId: `email#${string}`;
  }>();

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
                      <AlertDialogAction
                        onClick={() => handleContinueClick(bundle)}
                      >
                        Continue
                      </AlertDialogAction>
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
