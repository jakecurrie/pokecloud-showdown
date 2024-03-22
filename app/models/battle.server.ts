import arc from "@architect/functions";

export interface Battle {
  userId: string;
  battleId: string;
  trainerId: string;
  won: number;
}

export async function getBattlesByUserId(userId: string): Promise<Battle[]> {
  console.log(`Getting battles for user ID: ${userId}`);
  const db = await arc.tables();
  const result = await db.battles.query({
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: { ":userId": userId },
  });
  console.log(`Battles for user ID ${userId}:`, result.Items);
  return result.Items as Battle[];
}

export async function getBattleById(userId: string, battleId: string): Promise<Battle | null> {
  const db = await arc.tables();
  const result = await db.battles.get({ userId, battleId });
  console.log(`Battle for user ID ${userId} and battleId ${battleId}:`, result);
  return result ? (result as Battle) : null;
}

export async function createBattle(battle: Battle): Promise<void> {
  const db = await arc.tables();
  await db.battles.put({
    battleId: battle.battleId,
    userId: battle.userId,
    trainerId: battle.trainerId,
    won: battle.won,
  });
}

export async function updateBattleResult(
  userId: string,
  battleId: string,
  won: number,
): Promise<void> {
  const db = await arc.tables();
  console.log(`Updating battle result for userId: ${userId}, battleId: ${battleId}, won: ${won}`);
  await db.battles.update({
    Key: { userId, battleId },
    UpdateExpression: "SET won = :won",
    ExpressionAttributeValues: { ":won": won },
  });
}

export async function deleteBattle(
  userId: string,
  battleId: string,
): Promise<void> {
  const db = await arc.tables();
  await db.battles.delete({ userId, battleId });
}

export async function getBattleStatsByUserId(userId: string): Promise<{
  wins: number;
  losses: number;
  currentWinStreak: number;
}> {
  console.log(`Getting battle stats for user ID: ${userId}`);
  const battles = await getBattlesByUserId(userId);

  let wins = 0;
  let losses = 0;
  let currentWinStreak = 0;
  let isWinStreak = true;

  for (const battle of battles) {
    if (battle.won === 1) {
      wins++;
      if (isWinStreak) {
        currentWinStreak++;
      }
    } else {
      losses++;
      isWinStreak = false;
      currentWinStreak = 0;
    }
  }
  console.log(`Battle stats for user ID ${userId}:`, {
    wins,
    losses,
    currentWinStreak,
  });
  return { wins, losses, currentWinStreak };
}
