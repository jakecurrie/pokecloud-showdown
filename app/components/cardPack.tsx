import { FC } from "react";

import cardPic from "../../public/images/pokemon_card_back.png";

interface CardPackProps {
  tier: number;
  description: string;
  commonChance: number;
  uncommonChance: number;
  rareChance: number;
  legendaryChance: number;
  epicChance: number;
}

const CardPack: FC<CardPackProps> = ({
  tier,
  description,
  commonChance,
  uncommonChance,
  rareChance,
  legendaryChance,
  epicChance,
}) => {
  if (tier == 1) {
    return (
      <div className="group relative card bg-green-500 rounded-3xl shadow-2xl shadow-green-400 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
        <div
          className={
            "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center rounded-3xl"
          }
        >
          <p className="text-white text-sm">{description}</p>
          <p className="text-white text-sm">Common: {commonChance}%</p>
          <p className="text-white text-sm">Uncommon: {uncommonChance}%</p>
          <p className="text-white text-sm">Rare: {rareChance}%</p>
          <p className="text-white text-sm">Legendary: {legendaryChance}%</p>
          <p className="text-white text-sm">Epic: {epicChance}%</p>
        </div>
      </div>
    );
  } else if (tier == 2) {
    return (
      <div className="group relative card bg-blue-500 rounded-3xl shadow-2xl shadow-blue-500 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
        <div
          className={
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center rounded-3xl"
          }
        >
          <p className="text-white text-sm">{description}</p>
          <p className="text-white text-sm">Common: {commonChance}%</p>
          <p className="text-white text-sm">Uncommon: {uncommonChance}%</p>
          <p className="text-white text-sm">Rare: {rareChance}%</p>
          <p className="text-white text-sm">Legendary: {legendaryChance}%</p>
          <p className="text-white text-sm">Epic: {epicChance}%</p>
        </div>
      </div>
    );
  } else if (tier == 3) {
    return (
      <div className="group relative card bg-yellow-500 rounded-3xl shadow-2xl shadow-yellow-500 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
        <div
          className={
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center rounded-3xl"
          }
        >
          <p className="text-white text-sm">{description}</p>
          <p className="text-white text-sm">Common: {commonChance}%</p>
          <p className="text-white text-sm">Uncommon: {uncommonChance}%</p>
          <p className="text-white text-sm">Rare: {rareChance}%</p>
          <p className="text-white text-sm">Legendary: {legendaryChance}%</p>
          <p className="text-white text-sm">Epic: {epicChance}%</p>
        </div>
      </div>
    );
  } else if (tier == 4) {
    return (
      <div className="group relative card bg-red-500 rounded-3xl shadow-2xl shadow-red-500 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
        <div
          className={
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center rounded-3xl"
          }
        >
          <p className="text-white text-sm">{description}</p>
          <p className="text-white text-sm">Common: {commonChance}%</p>
          <p className="text-white text-sm">Uncommon: {uncommonChance}%</p>
          <p className="text-white text-sm">Rare: {rareChance}%</p>
          <p className="text-white text-sm">Legendary: {legendaryChance}%</p>
          <p className="text-white text-sm">Epic: {epicChance}%</p>
        </div>
      </div>
    );
  } else {
    return "Invalid tier";
  }
};

export default CardPack;
