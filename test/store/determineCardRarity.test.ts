import { describe, it, expect } from 'vitest';

import { determineCardRarity } from "~/models/shop.server";

describe('determineCardRarity', () => {
  it('should return a rarity based on the given distribution', () => {
    const distribution = { Common: 80, Uncommon: 15, Rare: 4, Legendary: 1 };
    const rarity = determineCardRarity(distribution);
    expect(['Common', 'Uncommon', 'Rare', 'Legendary']).toContain(rarity);
  });
});