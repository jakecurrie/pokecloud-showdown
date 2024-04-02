import React from "react";
import { LayoutGrid } from "~/components/ui/layoutGrid";
import { Link } from "@remix-run/react";
import { buttonVariants } from "~/components/ui/button";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Spend your hard-earned Pokecoins on card packs and grow your collection.
      </p>
      <Link to="/shop" className={buttonVariants({ variant: "outline" })}>
        Go To Shop
      </Link>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        View your collection of fierce Poke-warriors.
      </p>
      <Link to="/collections" className={buttonVariants({ variant: "outline" })}>
        View Your Collection
      </Link>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Blah blah blah
      </p>
      <Link to="/blah" className={buttonVariants({ variant: "outline" })}>
        This link goes nowhere
      </Link>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Select an opponent and 5 of your most trusted Pokemon for a thrilling battle.
      </p>
      <Link to="/battle" className={buttonVariants({ variant: "outline" })}>
        Start A Battle
      </Link>
    </div>
  );
};

const cards = [
  {
    id: 1,
    title: "Shop",
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Collection",
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Other",
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Battle",
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
