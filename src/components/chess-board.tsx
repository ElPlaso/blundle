import { Chessboard } from "react-chessboard";
import { useGameContext } from "../contexts/game";

export default function ChessBoard() {
  const { currentPosition, onDrop } = useGameContext();

  if (!currentPosition) return <div>Loading...</div>;

  return <Chessboard position={currentPosition} onPieceDrop={onDrop} />;
}
