import { useGameContext } from "../../contexts/game";

export default function StatsSubheading() {
  const { isSolved, isLost, getSolution } = useGameContext();

  return (
    <>
      <span className="text-3xl font-bold text-black dark:text-white">
        {isSolved ? "You win!" : isLost ? "You lose!" : "Playing..."}
      </span>

      {(isSolved || isLost) && (
        <span className="text-lightAbsent">
          Solution: {getSolution().join(" ")}
        </span>
      )}
    </>
  );
}
