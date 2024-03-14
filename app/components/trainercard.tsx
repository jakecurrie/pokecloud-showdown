import { FC } from "react";

import template from "../../public/images/trainer_card_template.jpg";

interface TrainerCardProps {
  name: string;
  imageURL: string;
  type: string;
  difficulty: number;
  details: string;
}

const TrainerCard: FC<TrainerCardProps> = ({
  name,
  imageURL,
  type,
  difficulty,
  details,
}) => {
  // Calculate the number of filled stars
  const filledStars = difficulty > 0 ? Math.min(difficulty, 5) : 0;
  // Calculate the number of hollow stars
  const hollowStars = Math.max(5 - filledStars, 0);

  // Create an array of filled stars
  const filledStarArray = Array.from({ length: filledStars }, (_, index) => (
    <span key={index} style={{ fontSize: "24px", color: "yellow" }}>
      ★
    </span>
  ));

  // Create an array of hollow stars
  const hollowStarArray = Array.from({ length: hollowStars }, (_, index) => (
    <span
      key={index}
      style={{
        fontSize: "24px",
        color: "transparent",
        textShadow: "0 0 0 white",
      }}
    >
      ☆
    </span>
  ));

  return (
    <div className="group relative border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow w-48 h-72">
      <div className="w-full h-full">
        <img src={template} alt="" className="w-full h-full" />
      </div>
      <div className={"absolute inset-0 object-contain"}>
        <img
          src={imageURL}
          alt={name}
          className={
            "box-content absolute top-11 w-36 left-5 border-4 border-gray-500"
          }
        />
        <div className="absolute top-1/2 left-0 w-full p-2 text-center">
          <div>
            {filledStarArray}
            {hollowStarArray}
          </div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p>Type: {type}</p>
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-75 p-4 flex flex-col justify-center items-center">
        <p className={"text-honeydew text-sm"}>{details}</p>
      </div>
    </div>
  );
};

export default TrainerCard;
