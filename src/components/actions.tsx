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
        onClick={handleUndo}
        disabled={undoDisabled || isSolved || isLost}
      >
        Undo
      </button>
      <button
        onClick={handleEnter}
        disabled={enterDisabled || isSolved || isLost}
      >
        Enter
      </button>
    </div>
  );
}
