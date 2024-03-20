import { getAllPokemon, Pokemon } from "./pokemon.server";

export interface CardBundle {
  cards: Pokemon[];
  tier: number;
  price: number;
}

export type Rarity = "Common" | "Uncommon" | "Rare" | "Legendary" | "Epic";

export const BUNDLE_TIERS: {
  tier: number;
  price: number;
  distribution: Record<Rarity, number>;
  description: string;
}[] = [
  {
    tier: 1,
    price: 100,
    distribution: { Common: 75, Uncommon: 15, Rare: 5, Legendary: 4, Epic: 1 },
    description:
      "Mix of common, rare, legendary, and epic cards with common being the most frequent.",
  },
  {
    tier: 2,
    price: 200,
    distribution: { Common: 0, Uncommon: 60, Rare: 30, Legendary: 8, Epic: 2 },
    description:
      "No common cards, focuses on uncommon, rare, legendary, and epic cards.",
  },
  {
    tier: 3,
    price: 500,
    distribution: { Common: 0, Uncommon: 30, Rare: 30, Legendary: 35, Epic: 5 },
    description:
      "Higher chance of getting legendary cards, alongside rare and epic cards.",
  },
  {
    tier: 4,
    price: 1000,
    distribution: { Common: 0, Uncommon: 0, Rare: 50, Legendary: 30, Epic: 20 },
    description:
      "No common or uncommon cards, provides a higher chance of rare, legendary, and epic cards.",
  },
];

export function getBundleTiersConstant() {
  return BUNDLE_TIERS;
}

export async function generateCardBundle(tier: number): Promise<CardBundle> {
  if (tier < 1 || tier > BUNDLE_TIERS.length) {
    throw new Error("Invalid bundle tier");
  }

  const { price, distribution } = BUNDLE_TIERS[tier - 1];
  const allPokemon = await getAllPokemon();
  const bundle: Pokemon[] = [];

  for (let i = 0; i < 5; i++) {
    // Assuming a bundle contains 5 cards
    const rarity = selectRarityBasedOnDistribution(distribution);
    const filteredPokemon = allPokemon.filter(
      (pokemon) => pokemon.rarity === rarity,
    );
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    bundle.push(filteredPokemon[randomIndex]);
  }

  return {
    cards: bundle,
    tier,
    price,
  };
}

function selectRarityBasedOnDistribution(
  distribution: Record<Rarity, number>,
): Rarity {
  const randomNum = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const rarity of [
    "Common",
    "Uncommon",
    "Rare",
    "Legendary",
    "Epic",
  ] as Rarity[]) {
    cumulativeProbability += distribution[rarity];
    if (randomNum <= cumulativeProbability) {
      return rarity;
    }
  }

  return "Common";
}
