import { useGameContext } from "../../contexts/utils";

export default function Undo() {
  const { removeLastGuessMove } = useGameContext();

  const handleUndo = () => {
    removeLastGuessMove();
  };

  return (
    <button
      className="px-4 py-2 font-semibold text-white rounded shadow cursor-pointer bg-lightAbsent dark:bg-darkAbsent disabled:bg-opacity-50 disabled:cursor-not-allowed"
      onClick={handleUndo}
    >
      Undo
    </button>
  );
}
