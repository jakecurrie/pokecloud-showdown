import arc from '@architect/functions';

import { getPokemonById, Pokemon } from "~/models/pokemon.server";

import type { User } from './user.server';

export interface CollectionItem {
  userId: User['id'];
  cardId: string;
  quantity: number;
}

export interface CollectionItemWithPokemon extends CollectionItem {
  pokemon: Pokemon | null;
}

export async function getCollectionItems({
  userId,
}: Pick<CollectionItem, 'userId'>): Promise<CollectionItem[]> {
  const db = await arc.tables();

  const result = await db.collections.query({
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: { ':pk': userId },
  });

  return result.Items.map((item) => ({
    userId: item.pk,
    cardId: item.sk,
    quantity: item.quantity,
  }));
}

export async function getCollectionWithPokemonDetails(userId: User['id']): Promise<CollectionItemWithPokemon[]> {
  const collectionItems = await getCollectionItems({ userId });

  const pokemonDetails = await Promise.all(
    collectionItems.map((item) => getPokemonById(item.cardId))
  );

  return collectionItems.map((item, index) => ({
    ...item,
    pokemon: pokemonDetails[index] || null,
  }));
}

export async function addCollectionItem({
  cardId,
  userId,
  quantity = 1,
}: Pick<CollectionItem, 'cardId' | 'userId'> & { quantity?: number }): Promise<void> {
  const db = await arc.tables();

  const existingItem = await db.collections.get({
    pk: userId,
    sk: cardId,
  });

  if (existingItem) {
    await db.collections.update({
      Key: {
        pk: userId,
        sk: cardId,
      },
      UpdateExpression: 'SET #quantity = #quantity + :increment',
      ExpressionAttributeNames: {
        '#quantity': 'quantity',
      },
      ExpressionAttributeValues: {
        ':increment': quantity,
      },
    });
  } else {
    await db.collections.put({
      pk: userId,
      sk: cardId,
      quantity: quantity,
    });
  }
}

export async function removeCollectionItem({
  userId,
  cardId,
}: Pick<CollectionItem, 'cardId' | 'userId'>): Promise<void> {
  const db = await arc.tables();
  await db.collections.delete({ pk: userId, sk: cardId });
}

