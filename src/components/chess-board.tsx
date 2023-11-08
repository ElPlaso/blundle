import { Chessboard } from "react-chessboard";
import useGame from "../hooks/use-game";

export default function ChessBoard() {
  const { game, onDrop } = useGame();

  if (!game) return <div>Loading...</div>;

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}
