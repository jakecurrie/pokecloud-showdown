import { ActionFunction, redirect } from "@remix-run/node";

import { updateBattleResult } from "~/models/battle.server";
import { changeBalance } from "~/models/pokecoins.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const battleData = Object.fromEntries(formData);
  const { battleId } = params;
  const won = formData.get("won") === "1";
  const reward = +battleData.reward;
  await changeBalance(userId, reward);

  if (!userId || !battleId) {
    return new Response("Invalid battle data", { status: 400 });
  }

  await updateBattleResult(userId, battleId, won ? 1 : 0);
  return redirect(`/home`);
};
