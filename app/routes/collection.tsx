import { FC } from "react";
import PokemonCard from "../components/pokecard";

const Collection: FC = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="max-w-screen-lg w-full px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center">
          <PokemonCard
            name="Pikachu"
            imageUrl="https://www.serebii.net/card/151/25.jpg"
            type="Electric"
            hp={60}
            attack="Pika Punch"
            defense="Static"
          />
          <PokemonCard
            name="Pikachu"
            imageUrl="https://www.serebii.net/card/151/25.jpg"
            type="Electric"
            hp={60}
            attack="Pika Punch"
            defense="Static"
          />
          <PokemonCard
            name="Pikachu"
            imageUrl="https://www.serebii.net/card/151/25.jpg"
            type="Electric"
            hp={60}
            attack="Pika Punch"
            defense="Static"
          />
          <PokemonCard
            name="Pikachu"
            imageUrl="https://www.serebii.net/card/151/25.jpg"
            type="Electric"
            hp={60}
            attack="Pika Punch"
            defense="Static"
          />
          <PokemonCard
            name="Pikachu"
            imageUrl="https://www.serebii.net/card/151/25.jpg"
            type="Electric"
            hp={60}
            attack="Pika Punch"
            defense="Static"
          />
          <PokemonCard
            name="Pikachu"
            imageUrl="https://www.serebii.net/card/151/25.jpg"
            type="Electric"
            hp={60}
            attack="Pika Punch"
            defense="Static"
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;
