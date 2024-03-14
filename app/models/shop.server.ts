import { Pokemon, getAllPokemon } from "./pokemon.server";

export interface CardBundle {
  cards: Pokemon[];
  tier: number;
  price: number;
}

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Epic';

const BUNDLE_TIERS: { tier: number; price: number; distribution: Record<Rarity, number> }[] = [
  { tier: 1, price: 100, distribution: { Common: 75, Uncommon: 15, Rare: 5, Legendary: 4, Epic: 1 } },
  { tier: 2, price: 200, distribution: { Common: 55, Uncommon: 25, Rare: 10, Legendary: 8, Epic: 2 } },
  { tier: 3, price: 300, distribution: { Common: 35, Uncommon: 30, Rare: 20, Legendary: 12, Epic: 3 } },
  { tier: 4, price: 500, distribution: { Common: 15, Uncommon: 30, Rare: 25, Legendary: 20, Epic: 10 } },
];

export async function generateCardBundle(tier: number): Promise<CardBundle> {
  if (tier < 1 || tier > BUNDLE_TIERS.length) {
    throw new Error('Invalid bundle tier');
  }

  const { price, distribution } = BUNDLE_TIERS[tier - 1];
  const allPokemon = await getAllPokemon();
  const bundle: Pokemon[] = [];

  for (let i = 0; i < 5; i++) { // Assuming a bundle contains 5 cards
    const rarity = selectRarityBasedOnDistribution(distribution);
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.rarity === rarity);
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    bundle.push(filteredPokemon[randomIndex]);
  }

  return {
    cards: bundle,
    tier,
    price,
  };
}

function selectRarityBasedOnDistribution(distribution: Record<Rarity, number>): Rarity {
  const randomNum = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const rarity of ['Common', 'Uncommon', 'Rare', 'Legendary', 'Epic'] as Rarity[]) {
    cumulativeProbability += distribution[rarity];
    if (randomNum <= cumulativeProbability) {
      return rarity;
    }
  }

  return 'Common';
}



