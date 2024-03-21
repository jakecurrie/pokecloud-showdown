import { useEffect, useState } from "react";

export const TimingSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [movingRight, setMovingRight] = useState(true);
  const [attackStrength, setAttackStrength] = useState(0);
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

  const stopSlider = () => {
    setIsStopped(true);
    const strength = 100 - 2 * Math.abs(sliderPosition - 50);
    setAttackStrength(strength);
    console.log(`Attack strength: ${strength}%`);
  };

  return (
    <div className="relative w-72 h-5 bg-gray-300">
      <div
        className="absolute w-2 h-5 bg-red-500"
        style={{ left: `${sliderPosition}%` }}
      ></div>
      <br/>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={stopSlider}
        disabled={isStopped}
      >
        Attack
      </button>
      {isStopped && <div className="mt-2">Attack Strength: {attackStrength}%</div>}
    </div>
  );
};
