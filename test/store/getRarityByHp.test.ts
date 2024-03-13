import { describe, it, expect } from 'vitest';

import { getRarityByHp, HP_RARITY_THRESHOLDS } from "~/models/shop.server";

describe('getRarityByHp', () => {
  it('should return the correct rarity based on HP', () => {
    Object.entries(HP_RARITY_THRESHOLDS).forEach(([rarity, hp]) => {
      expect(getRarityByHp(hp)).toBe(rarity);
    });
  });
});