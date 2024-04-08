import { Form } from "@remix-run/react";
import React, { useState } from "react";

import TimingSlider from "~/components/timingSlider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

interface Pokemon {
  name: string;
  hp: number;
  attack: number;
}

interface Props {
  playerTeam: Pokemon[];
  enemyTeam: Pokemon[];
  battleId: string;
  difficulty: number;
}

const BattleComponent: React.FC<Props> = ({
  playerTeam,
  enemyTeam,
  battleId,
  difficulty,
}) => {
  const [playerCurrent, setPlayerCurrent] = useState<number>(0);
  const [enemyCurrent, setEnemyCurrent] = useState<number>(0);
  const [battleMessage, setBattleMessage] = useState<string>("");
  const [resetKey, setResetKey] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAlert, setShowAlert] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alertMessage, setAlertMessage] = useState("");
  const [battleWon, setBattleWon] = useState<boolean>(false);

  console.log(`Battle ID: ${battleId}`);

  const playerPokemon = playerTeam[playerCurrent];
  const enemyPokemon = enemyTeam[enemyCurrent];

  const resetSlider = () => {
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleAttack = (attackStrength: number) => {
    if (gameOver) return;

    const damage = Math.round((playerPokemon.attack * attackStrength) / 100);
    enemyPokemon.hp = Math.max(enemyPokemon.hp - damage, 0);
    setBattleMessage(
      `You dealt ${damage} damage to ${enemyPokemon.name.toUpperCase()}!`,
    );

    if (enemyPokemon.hp <= 0) {
      const nextEnemy = enemyCurrent + 1;
      if (nextEnemy < enemyTeam.length) {
        setEnemyCurrent(nextEnemy);
        setBattleMessage(
          `${enemyPokemon.name} fainted! Sending out next Pokémon...`,
        );
      } else {
        setBattleWon(true);
        setGameOver(true);
        setBattleMessage("You won the battle!");
        setShowAlert(true);
        setAlertMessage("Congratulations! You won the battle!");
        return;
      }
    }

    setTimeout(() => {
      if (gameOver) return;

      if (enemyCurrent < enemyTeam.length) {
        // Calculate enemy's damage between 25% to 75% of enemy's attack
        const minDamagePercentage = 25;
        const maxDamagePercentage = 75;
        const randomDamagePercentage =
          Math.floor(
            Math.random() * (maxDamagePercentage - minDamagePercentage + 1),
          ) + minDamagePercentage;
        const enemyDamage = Math.round(
          (enemyPokemon.attack * randomDamagePercentage) / 100,
        );

        playerPokemon.hp = Math.max(playerPokemon.hp - enemyDamage, 0);
        setBattleMessage(
          `${enemyPokemon.name.toUpperCase()} attacked you for ${enemyDamage} damage!`,
        );

        if (playerPokemon.hp <= 0) {
          const nextPlayer = playerCurrent + 1;
          if (nextPlayer < playerTeam.length) {
            setPlayerCurrent(nextPlayer);
            setBattleMessage(
              `Your Pokémon fainted! Sending out next Pokémon...`,
            );
          } else {
            setGameOver(true);
            setBattleMessage("You lost the battle!");
            setShowAlert(true);
            setAlertMessage("You lost the battle. Better luck next time!");
          }
        }
      }
      resetSlider();
    }, 1500);
  };

  return (
    <div className="w-96">
      {!gameOver ? (
        <>
          <div className="p-2">
            <h3>
              Your Pokémon: {playerPokemon.name.toUpperCase()} (HP:{" "}
              {playerPokemon.hp})
            </h3>
          </div>
          <div className="p-2">
            <h3>
              Enemy Pokémon: {enemyPokemon.name.toUpperCase()} (HP:{" "}
              {enemyPokemon.hp})
            </h3>
          </div>
          <p>{battleMessage}</p>
          <br />
          <TimingSlider key={resetKey} onConfirm={handleAttack} />
        </>
      ) : (
        <p>{battleMessage}</p>
      )}
      {gameOver && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="mt-10 p-4 text-2xl bg-blue-800 text-white border-4 border-charcoal rounded-xl">
              FINALIZE RESULT
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Battle Result:{" "}
                {battleWon ? (
                  <p>
                    You have won! And been awarded {100 * difficulty} Pokecoins
                  </p>
                ) : (
                  <p>Tough loss!</p>
                )}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Form method="post" action={`/battle/${battleId}/result`}>
              <input
                type="hidden"
                name="reward"
                value={battleWon ? `${100 * difficulty}` : ""}
              />
              <input type="hidden" name="battleId" value={battleId} />
              <input type="hidden" name="won" value={battleWon ? "1" : "0"} />
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <button type="button">Close</button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button type="submit">Submit Result</button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </Form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BattleComponent;
