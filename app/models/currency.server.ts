import arc from '@architect/functions';

export async function getBalance(userId: string): Promise<number> {
  const db = await arc.tables();
  try {
    const result = await db.currency.query({
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':userId': userId },
    });

    if (result.Items.length > 0) {
      return result.Items[0].balance;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(`Error getting balance for userId ${userId}:`, error);
    throw new Error(`Error getting balance for userId ${userId}`);
  }
}

export async function changeBalance(userId: string, amount: number): Promise<void> {
  const db = await arc.tables();

  try {
    const result = await db.currency.query({
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':userId': userId },
    });

    if (result.Items.length > 0) {
      const currentBalance = result.Items[0].balance;
      const newBalance = currentBalance + amount;

      if (newBalance >= 0) {
        await db.currency.put({
          userId: userId,
          balance: newBalance,
        });
      } else {
        throw new Error('Cannot change balance to a value below zero');
      }
    } else {
      throw new Error('User balance not found');
    }
  } catch (error) {
    console.error(`Error changing balance for userId ${userId}:`, error);
    throw new Error(`Error changing balance for userId ${userId}`);
  }
}

