import { FC } from "react";

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  type: string;
  hp: number;
  attack: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ name, imageUrl, type, hp, attack}) => {
  return (
    <div className="group relative border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow w-48 h-72">
      <img src={imageUrl} alt={name} className="w-full h-3/4 object-contain" />
      <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-2 text-center">
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center">
        <p className="text-white">Type: {type}</p>
        <p className="text-white">HP: {hp}</p>
        <p className="text-white">Attack: {attack}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
