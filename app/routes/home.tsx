import { MetaFunction } from "@remix-run/node";

import Button from "~/components/button";
import GameStats from "~/components/gameStats";

import homePic from "../../public/images/battle.jpg";
import logoPic from "../../public/images/logo.png";
import { Link, useSearchParams } from "@remix-run/react";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export default function Home() {
  const [searchParams] = useSearchParams();
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
          <GameStats />
        </div>
      </div>
    </div>
  );
}
