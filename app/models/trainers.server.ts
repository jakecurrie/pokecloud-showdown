import arc from "@architect/functions";

export interface Trainer {
  id: string;
  name: string;
  imageURL: string;
  type: string;
  difficulty: number;
  details: string;
  collectionId: string;
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
