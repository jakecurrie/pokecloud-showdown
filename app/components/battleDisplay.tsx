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
}

const BattleComponent: React.FC<Props> = ({
  playerTeam,
  enemyTeam,
  battleId,
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
    setBattleMessage(`You dealt ${damage} damage to ${enemyPokemon.name}!`);

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
        const enemyDamage = Math.round(enemyPokemon.attack * 0.5);
        playerPokemon.hp = Math.max(playerPokemon.hp - enemyDamage, 0);
        setBattleMessage(
          `${enemyPokemon.name} attacked you for ${enemyDamage} damage!`,
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
    }, 1000);
  };

  return (
    <div>
      {!gameOver ? (
        <>
          <div>
            <h3>
              Your Pokémon: {playerPokemon.name} (HP: {playerPokemon.hp})
            </h3>
          </div>
          <div>
            <h3>
              Enemy Pokémon: {enemyPokemon.name} (HP: {enemyPokemon.hp})
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
            <button>See Battle Result</button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Battle Result:{" "}
                {battleWon ? (
                  <p>You have won! And been awarded 250 Pokecoins</p>
                ) : (
                  <p>Tough loss!</p>
                )}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Form method="post" action={`/battle/${battleId}/result`}>
              <input
                type="hidden"
                name="reward"
                value={battleWon ? "250" : ""}
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
