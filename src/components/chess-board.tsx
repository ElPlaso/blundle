import { Chessboard } from "react-chessboard";
import { useGameContext } from "../contexts/game";

export default function ChessBoard() {
  const { currentPosition, toWin, onDrop } = useGameContext();

  if (!currentPosition) return <div></div>;

  return (
    <Chessboard
      position={currentPosition}
      onPieceDrop={onDrop}
      boardOrientation={toWin.toLocaleLowerCase() as "white" | "black"}
    />
  );
}
