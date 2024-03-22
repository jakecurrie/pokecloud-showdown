import { ActionFunction, redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { updateBattleResult } from "~/models/battle.server";
import { changeBalance } from "~/models/pokecoins.server";

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const battleData = Object.fromEntries(formData);
  const { battleId } = params;
  const won = formData.get("won") === "1";
  const amount = battleData.reward.toString();
  let reward: number;
  if (amount == "250") {
    reward = 250;
    await changeBalance(userId, reward);
  }

  if (!userId || !battleId) {
    return new Response("Invalid battle data", { status: 400 });
  }

  await updateBattleResult(userId, battleId, won ? 1 : 0);
  return redirect(`/home`);
};
