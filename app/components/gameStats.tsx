function GameStats() {
  return (
    <div className="absolute w-full bottom-10">
      <div className="relative grid grid-cols-7 gap-4 bg-biceblue p-2 rounded-lg">
        <div className="bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
          <h2 className="text-3xl pt-2">
            <strong> Player Name </strong>
          </h2>
        </div>
        <div>
          <p className="text-center text-xl w-full bg-honeydew rounded-lg p-1 shadow-md">
            <strong>Wins:</strong>
            <br />
            10
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Losses:</strong> <br />5
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Win %:</strong>
            <br />
            66.67%
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Win Streak:</strong>
            <br />3
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Badges Collected:</strong>
            <br />8
          </p>
        </div>
        <div>
          <p className="mb-1 text-xl bg-honeydew rounded-lg p-1 shadow-md text-center w-full">
            <strong>Pokemon Collected:</strong>
            <br />
            100/151
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameStats;
