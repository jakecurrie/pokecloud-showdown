import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { CardBundle, generateCardBundle } from "~/models/shop.server";

export const loader: LoaderFunction = async () => {
  const bundles: CardBundle[] = [];
  for (let tier = 1; tier <= 4; tier++) {
    const bundle = await generateCardBundle(tier);
    bundles.push(bundle);
  }
  return json({ bundles });
};

export default function Shop() {
  const { bundles } = useLoaderData<{ bundles: CardBundle[] }>();

  return (
    <div>
      {bundles.map((bundle, index) => (
        <div key={index}>
          <h2>Tier {bundle.tier}</h2>
          <p>Price: {bundle.price}</p>
          <ul>
            {bundle.cards.map((card, cardIndex) => (
              <li key={cardIndex}>
                {card.name} - HP: {card.hp} - Rarity: {card.rarity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
