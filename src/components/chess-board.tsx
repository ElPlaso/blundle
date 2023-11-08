import { Chessboard } from "react-chessboard";
import { useGameContext } from "../contexts/game";

export default function ChessBoard() {
  const gameContext = useGameContext();

  const { game, onDrop } = gameContext;

  if (!game) return <div>Loading...</div>;

  return (
    <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth={500} />
  );
}
