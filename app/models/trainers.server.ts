import arc from "@architect/functions";

import { getCollectionItems } from "~/models/collections.server";
import { getPokemonById, Pokemon } from "~/models/pokemon.server";

export interface Trainer {
  id: `email#${string}`;
  name: string;
  imageURL: string;
  type: string;
  difficulty: number;
  details: string;
  collectionId: string;
}

export interface TrainerCollectionItem {
  userId: Trainer['id'];
  cardId: string;
  quantity: number;
}

export interface TrainerCollectionItemWithPokemon extends TrainerCollectionItem {
  pokemon: Pokemon | null;
}

export async function getAllTrainers(): Promise<Trainer[]> {
  const db = await arc.tables();
  const result = await db.trainers.scan({});
  if (!result.Items) {
    return [];
  }
  return result.Items.map((item) => item as Trainer);
}

export async function getTrainerById(id: string): Promise<Trainer | null> {
  const db = await arc.tables();
  const result = await db.trainers.get({ id });
  if (!result) {
    return null;
  }
  return result as Trainer;
}

export async function getTrainerCollectionItems({ userId }: Pick<TrainerCollectionItem, 'userId'>): Promise<TrainerCollectionItem[]> {
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

export async function getTrainerCollectionWithPokemonDetails(userId: Trainer['id']): Promise<TrainerCollectionItemWithPokemon[]> {
  const collectionItems = await getCollectionItems({ userId });

  const pokemonDetails = await Promise.all(
    collectionItems.map((item) => getPokemonById(item.cardId))
  );

  return collectionItems.map((item, index) => ({
    ...item,
    pokemon: pokemonDetails[index] || null,
  }));
}
