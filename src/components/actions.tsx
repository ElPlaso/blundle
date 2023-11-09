import { useMemo } from "react";
import { useGameContext } from "../contexts/game";

export default function Actions() {
  const { removeLastGuessMove, submitGuess, currentGuessMoves } =
    useGameContext();

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
    <div>
      <button onClick={handleUndo} disabled={undoDisabled}>
        Undo
      </button>
      <span style={{ margin: 5 }}></span>
      <button onClick={handleEnter} disabled={enterDisabled}>
        Enter
      </button>
    </div>
  );
}
