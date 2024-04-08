import { FC } from "react";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  type: string;
  hp: number;
  attack: string;
}

const PokemonCard: FC<PokemonCardProps> = ({
  name,
  imageUrl,
  type,
  hp,
  attack,
}) => {
  return (
    <div className="group relative border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow w-full">
      <img src={imageUrl} alt={name} className="w-full h-full rounded-lg" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col gap-2 justify-center items-center">
        <p className="text-white text-sm">Type: {type.toUpperCase()}</p>
        <p className="text-white text-sm">HP: {hp}</p>
        <p className="text-white text-sm">
          Attack: {attack.substring(0, 1).toUpperCase() + attack.substring(1)}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
