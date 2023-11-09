import { useGameContext } from "../contexts/game";

export default function Actions() {
  const { removeLastGuessMove, submitGuess } = useGameContext();

  const handleUndo = () => {
    removeLastGuessMove();
  };

  const handleEnter = () => {
    submitGuess();
  };

  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <span style={{ margin: 5 }}></span>
      <button onClick={handleEnter}>Enter</button>
    </div>
  );
}
