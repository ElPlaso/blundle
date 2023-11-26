import { useMemo } from "react";
import { useGameContext } from "../contexts/game";

export default function Actions() {
  const {
    removeLastGuessMove,
    submitGuess,
    currentGuessMoves,
    isSolved,
    isLost,
  } = useGameContext();

  const handleUndo = () => {
    removeLastGuessMove();
  };

  const handleEnter = () => {
    console.log(submitGuess());
  };

  const enterDisabled = useMemo(() => {
    return currentGuessMoves.includes("");
  }, [currentGuessMoves]);

  const undoDisabled = useMemo(() => {
    return currentGuessMoves.every((move) => move === "");
  }, [currentGuessMoves]);

  return (
    <div className="flex gap-x-2">
      <button
        className="text-white bg-lightAbsent dark:bg-darkAbsent rounded px-4 py-2 shadow cursor-pointer font-semibold disabled:bg-opacity-50 disabled:cursor-not-allowed"
        onClick={handleUndo}
        disabled={undoDisabled || isSolved || isLost}
      >
        Undo
      </button>
      <button
        className="text-white bg-lightCorrect dark:bg-darkCorrect rounded px-4 py-2 shadow cursor-pointer font-semibold disabled:bg-opacity-50 disabled:cursor-not-allowed"
        onClick={handleEnter}
        disabled={enterDisabled || isSolved || isLost}
      >
        Enter
      </button>
    </div>
  );
}
