// app/models/pokemon.server.ts
import arc from '@architect/functions';

export interface Pokemon {
  id: string;
  name: string;
  type: string,
  attack: string;
  hp: number;
  image_url: string;
}

export async function getAllPokemon(): Promise<Pokemon[]> {
  const db = await arc.tables();
  const result = await db.pokemon.scan({});
  return result.Items.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.type,
    attack: item.attack,
    hp: item.hp,
    image_url: item.image_url,
  }));
}

export async function getPokemonById(id: string): Promise<Pokemon | null> {
  const db = await arc.tables();
  const result = await db.pokemon.get({ id });
  if (result) {
    return {
      id: result.id,
      name: result.name,
      type: result.type,
      attack: result.attack,
      hp: result.hp,
      image_url: result.image_url,
    };
  }
  return null;
}

