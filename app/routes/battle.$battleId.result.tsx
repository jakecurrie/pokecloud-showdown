import { ActionFunction, redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { updateBattleResult } from "~/models/battle.server";

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const { battleId } = params;
  const won = formData.get("won") === "1";

  if (!userId || !battleId) {
    return new Response("Invalid battle data", { status: 400 });
  }

  await updateBattleResult(userId, battleId, won ? 1 : 0);
  return redirect(`/home`);
};