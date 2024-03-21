import React, { useState } from 'react';
import TimingSlider from '~/components/timingSlider';

interface Pokemon {
  name: string;
  hp: number;
  attack: number;
}

interface Props {
  playerTeam: Pokemon[];
  enemyTeam: Pokemon[];
}

const BattleComponent: React.FC<Props> = ({ playerTeam, enemyTeam }) => {
  const [playerCurrent, setPlayerCurrent] = useState<number>(0);
  const [enemyCurrent, setEnemyCurrent] = useState<number>(0);
  const [battleMessage, setBattleMessage] = useState<string>('');
  const [resetKey, setResetKey] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

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
        setBattleMessage(`${enemyPokemon.name} fainted! Sending out next Pokémon...`);
      } else {
        setGameOver(true);
        setBattleMessage('You won the battle!');
        return;
      }
    }

    setTimeout(() => {
      if (gameOver) return;

      if (enemyCurrent < enemyTeam.length) {
        const enemyDamage = Math.round(enemyPokemon.attack * 0.5);
        playerPokemon.hp = Math.max(playerPokemon.hp - enemyDamage, 0);
        setBattleMessage(`${enemyPokemon.name} attacked you for ${enemyDamage} damage!`);

        if (playerPokemon.hp <= 0) {
          const nextPlayer = playerCurrent + 1;
          if (nextPlayer < playerTeam.length) {
            setPlayerCurrent(nextPlayer);
            setBattleMessage(`Your Pokémon fainted! Sending out next Pokémon...`);
          } else {
            setGameOver(true);
            setBattleMessage('You lost the battle!');
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
            <h3>Your Pokémon: {playerPokemon.name} (HP: {playerPokemon.hp})</h3>
          </div>
          <div>
            <h3>Enemy Pokémon: {enemyPokemon.name} (HP: {enemyPokemon.hp})</h3>
          </div>
          <p>{battleMessage}</p>
          <br/>
          <TimingSlider key={resetKey} onConfirm={handleAttack} />
        </>
      ) : (
        <p>{battleMessage}</p>
      )}
    </div>
  );
};

export default BattleComponent;


