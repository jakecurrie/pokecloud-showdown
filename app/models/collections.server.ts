import arc from '@architect/functions';
import { createId } from '@paralleldrive/cuid2';

import { getPokemonById, Pokemon } from "~/models/pokemon.server";

import type { User } from './user.server';

export interface CollectionItem {
  id: ReturnType<typeof createId>;
  userId: User['id'];
  cardId: string;
  quantity: number;
}

export interface CollectionItemWithPokemon extends CollectionItem {
  pokemon: Pokemon | null;
}

interface CollectionItemRecord {
  pk: User['id'];
  sk: `card#${CollectionItem['id']}`;
}

const skToId = (sk: CollectionItemRecord['sk']): CollectionItem['id'] => sk.replace(/^card#/, '');
const idToSk = (id: CollectionItem['id']): CollectionItemRecord['sk'] => `card#${id}`;

export async function getCollectionItem({
  id,
  userId,
}: Pick<CollectionItem, 'id' | 'userId'>): Promise<CollectionItem | null> {
  const db = await arc.tables();

  const result = await db.collections.get({ pk: userId, sk: idToSk(id) });

  if (result) {
    return {
      userId: result.pk,
      id: result.sk,
      cardId: result.cardId,
      quantity: result.quantity,
    };
  }
  return null;
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
    id: skToId(item.sk),
    cardId: item.cardId,
    quantity: item.quantity,
  }));
}

export async function getCollectionWithPokemonDetails(email: User['email']): Promise<CollectionItemWithPokemon[]> {
  const userId: User['id'] = `email#${email}`;
  const collectionItems = await getCollectionItems({ userId });

  const pokemonDetails = await Promise.all(
    collectionItems.map((item) => getPokemonById(item.cardId))
  );

  return collectionItems.map((item, index) => ({
    ...item,
    userId,
    pokemon: pokemonDetails[index] || null,
  }));
}


export async function addCollectionItem({
  cardId,
  userId,
  quantity = 1,
}: Pick<CollectionItem, 'cardId' | 'userId'> & { quantity?: number }): Promise<CollectionItem> {
  const db = await arc.tables();

  const result = await db.collections.put({
    pk: userId,
    sk: idToSk(createId()),
    cardId: cardId,
    quantity: quantity,
  });
  return {
    id: skToId(result.sk),
    userId: result.pk,
    cardId: result.cardId,
    quantity: result.quantity,
  };
}

export async function removeCollectionItem({
  id,
  userId,
}: Pick<CollectionItem, 'id' | 'userId'>) {
  const db = await arc.tables();
  return db.collections.delete({ pk: userId, sk: idToSk(id) });
}


