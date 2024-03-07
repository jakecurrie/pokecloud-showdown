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
  try {
    const result = await db.pokemon.query({
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': id },
    });
    if (result.Items && result.Items.length > 0) {
      const item = result.Items[0];
      return {
        id: item.id,
        name: item.name,
        type: item.type,
        attack: item.attack,
        hp: item.hp,
        image_url: item.image_url,
      };
    }
    return null;
  } catch (error) {
    console.error('getPokemonById: error:', error);
    return null;
  }
}





