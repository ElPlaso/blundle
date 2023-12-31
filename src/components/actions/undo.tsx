import { useGameContext } from "../../contexts/game";

export default function Undo() {
  const { removeLastGuessMove } = useGameContext();

  const handleUndo = () => {
    removeLastGuessMove();
  };

  return (
    <button
      className="text-white bg-lightAbsent dark:bg-darkAbsent rounded px-4 py-2 shadow cursor-pointer font-semibold disabled:bg-opacity-50 disabled:cursor-not-allowed"
      onClick={handleUndo}
    >
      Undo
    </button>
  );
}
