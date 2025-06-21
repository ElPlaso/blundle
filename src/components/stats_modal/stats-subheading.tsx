import { useGameContext } from "../../contexts/utils";

export default function StatsSubheading() {
  const { isSolved, isLost, puzzleNumber, getSolution } = useGameContext();

  return (
    <>
      <span className="text-lightAbsent">
        {puzzleNumber !== null && `Puzzle #${puzzleNumber}`}
      </span>

      <span className="text-3xl font-bold text-black dark:text-white">
        {isSolved ? "You win!" : isLost ? "You lose!" : "Playing..."}
      </span>

      {(isSolved || isLost) && (
        <>
          <span className="text-lightAbsent">
            Solution: {getSolution().join(" ")}
          </span>

          <span className="text-xs opacity-50 text-lightAbsent">
            You can continue making/undoing moves
          </span>
        </>
      )}
    </>
  );
}
