import { FC } from "react";

interface GameStatsProps {
  name: string;
  wins: number;
  losses: number;
  winPercent: number;
  winStreak: number;
  badges: number;
  pokemonCollected: number;
}

const GameStats: FC<GameStatsProps> = ({
  name,
  wins,
  losses,
  winPercent,
  winStreak,
  badges,
  pokemonCollected,
}) => {
  // Remove first 6 characters
  const truncatedName = name.substring(6);

  // Find index of '@' symbol
  const atIndex = truncatedName.indexOf("@");

  // Remove characters after and including '@' symbol
  const finalName =
    atIndex !== -1 ? truncatedName.substring(0, atIndex) : truncatedName;

  return (
    <div className="absolute w-full bottom-10">
      <div className="relative grid grid-cols-7 gap-4 bg-biceblue p-2 rounded-lg">
        <div className="bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
          <h2 className="text-3xl pt-2">
            <strong> {finalName} </strong>
          </h2>
        </div>
        <div>
          <p className="text-center text-xl w-full bg-honeydew rounded-lg p-1 shadow-md">
            <strong>Wins:</strong>
            <br />
            {wins}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Losses:</strong> <br />
            {losses}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Win %:</strong>
            <br />
            {winPercent * 100}%
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Win Streak:</strong>
            <br />
            {winStreak}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Badges Collected:</strong>
            <br /> {badges}/8
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Pokemon Collected:</strong>
            <br />
            {pokemonCollected}/151
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
