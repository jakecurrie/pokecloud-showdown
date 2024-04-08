import React, { useEffect, useState } from "react";

interface TimingSliderProps {
  onConfirm: (attackStrength: number) => void;
  resetKey?: number; // Add a resetKey prop
}

const TimingSlider: React.FC<TimingSliderProps> = ({ onConfirm, resetKey }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [movingRight, setMovingRight] = useState(true);
  const [isStopped, setIsStopped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStopped) {
        setSliderPosition((prevPosition) => {
          if (prevPosition >= 100) {
            setMovingRight(false);
            return prevPosition - 5;
          } else if (prevPosition <= 0) {
            setMovingRight(true);
            return prevPosition + 5;
          } else {
            return movingRight ? prevPosition + 5 : prevPosition - 5;
          }
        });
      }
    }, 15);

    return () => clearInterval(interval);
  }, [movingRight, isStopped]);

  useEffect(() => {
    setIsStopped(false);
    setSliderPosition(50);
  }, [resetKey]);

  const stopSlider = () => {
    setIsStopped(true);
    const strength = 100 - 2 * Math.abs(sliderPosition - 50);
    onConfirm(strength);
    console.log(`Attack strength: ${strength}%`);
  };

  return (
    <div className="relative w-72 h-5 bg-gray-300">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-600"></div>
      <div className="absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-red-600 via-yellow-400 to-green-400"></div>
      <div className="absolute top-0 left-1/2 w-2 h-full bg-black"></div>
      <div
        className="absolute w-2 h-5 bg-blue-800"
        style={{ left: `${sliderPosition}%` }}
      ></div>
      <br />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={stopSlider}
        disabled={isStopped}
      >
        Attack
      </button>
      {isStopped ? (
        <div className="mt-2">
          Attack Strength: {100 - 2 * Math.abs(sliderPosition - 50)}%
        </div>
      ) : null}
    </div>
  );
};

export default TimingSlider;
