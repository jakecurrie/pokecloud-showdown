import { Pokemon, getAllPokemon } from "./pokemon.server";

export interface CardBundle {
  cards: Pokemon[];
  tier: number;
  price: number;
}

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary';

export const HP_RARITY_THRESHOLDS: Record<Rarity, number> = {
  Common: 1,
  Uncommon: 70,
  Rare: 90,
  Legendary: 110,
};

const BUNDLE_TIERS: { tier: number; price: number; distribution: Record<Rarity, number> }[] = [
  { tier: 1, price: 100, distribution: { Common: 80, Uncommon: 15, Rare: 4, Legendary: 1 } },
  { tier: 2, price: 200, distribution: { Common: 60, Uncommon: 25, Rare: 10, Legendary: 5 } },
  { tier: 3, price: 300, distribution: { Common: 40, Uncommon: 30, Rare: 20, Legendary: 10 } },
  { tier: 4, price: 500, distribution: { Common: 20, Uncommon: 30, Rare: 30, Legendary: 20 } },
];

export async function generateCardBundle(tier: number): Promise<CardBundle> {
  if (tier < 1 || tier > BUNDLE_TIERS.length) {
    throw new Error('Invalid bundle tier');
  }

  const { price, distribution } = BUNDLE_TIERS[tier - 1];
  const allPokemon = await getAllPokemon();
  const bundle: Pokemon[] = [];

  for (let i = 0; i < 5; i++) {
    const rarity = determineCardRarity(distribution);
    const filteredPokemon = allPokemon.filter(pokemon => getRarityByHp(pokemon.hp) === rarity);
    const randomIndex = Math.floor(Math.random() * filteredPokemon.length);
    bundle.push(filteredPokemon[randomIndex]);
  }

  return {
    cards: bundle,
    tier,
    price,
  };
}

export function determineCardRarity(distribution: Record<Rarity, number>): Rarity {
  const randomNum = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const rarity of ['Common', 'Uncommon', 'Rare', 'Legendary'] as Rarity[]) {
    cumulativeProbability += distribution[rarity];
    if (randomNum <= cumulativeProbability) {
      return rarity;
    }
  }

  return 'Common';
}

export function getRarityByHp(hp: number): Rarity {
  for (const rarity of ['Common', 'Uncommon', 'Rare', 'Legendary'] as Rarity[]) {
    if (hp <= HP_RARITY_THRESHOLDS[rarity]) {
      return rarity;
    }
  }
  return 'Common';
}


