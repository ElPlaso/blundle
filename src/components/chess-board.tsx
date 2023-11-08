import { Chessboard } from "react-chessboard";
import { useGameContext } from "../contexts/game";

export default function ChessBoard() {
  const { game, onDrop } = useGameContext();

  if (!game) return <div>Loading...</div>;

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}
