import { motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "~/lib/cn";

interface Card {
  id: number;
  title: string;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
}

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-xl h-full w-full"
                  : "bg-white rounded-xl h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <BlurImage card={card} isSelected={selected?.id === card.id} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const BlurImage = ({ card, isSelected }: { card: Card; isSelected: boolean }) => {
  return (
    <div className="relative h-full w-full">
      <img
        src={card.thumbnail}
        className="object-cover object-top absolute inset-0 h-full w-full"
        alt="thumbnail"
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <p className="text-white text-lg font-bold">{card.title}</p>
      </div>
      {isSelected && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
    </div>
  );
};





const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <div className="absolute inset-0">
        <img
          src={selected?.thumbnail}
          className="object-cover object-top h-full w-full"
          alt="thumbnail"
        />
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        <p className="font-bold text-4xl text-white">{selected?.title}</p>
        {selected?.content}
      </motion.div>
    </div>
  );
};
