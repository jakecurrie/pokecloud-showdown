import { FC } from "react";

import cardPic from "../../public/images/pokemon_card_back.png";

interface CardPackProps {
  tier: number;
}

const CardPack: FC<CardPackProps> = ({ tier }) => {
  if (tier == 1) {
    return (
      <div className="card bg-green-500 rounded-3xl shadow-2xl shadow-green-400 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
      </div>
    );
  } else if (tier == 2) {
    return (
      <div className="card bg-blue-500 rounded-3xl shadow-2xl shadow-blue-500 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
      </div>
    );
  } else if (tier == 3) {
    return (
      <div className="card bg-yellow-500 rounded-3xl shadow-2xl shadow-yellow-500 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
      </div>
    );
  } else if (tier == 4) {
    return (
      <div className="card bg-red-500 rounded-3xl shadow-2xl shadow-red-500 w-full">
        <img
          src={cardPic}
          alt="Pokemon Card Back"
          className="filter mix-blend-multiply grayscale rounded-3xl w-full"
        />
      </div>
    );
  } else {
    return "Invalid tier";
  }
};

export default CardPack;
