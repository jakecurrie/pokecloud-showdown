import { Outlet } from "@remix-run/react";
import BattleComponent from "../components/battleDisplay";

const playerTeam = [
  { name: "Pikachu", hp: 150, attack: 80 },
  { name: "Charmander", hp: 140, attack: 60 },
];

const enemyTeam = [
  { name: "Bulbasaur", hp: 110, attack: 55 },
  { name: "Squirtle", hp: 130, attack: 65 },
];

export default function BattleTestRoute() {
  return (
    <div>
      <BattleComponent playerTeam={playerTeam} enemyTeam={enemyTeam} />
      <Outlet />
    </div>
  );
}
