import { Chessboard } from "react-chessboard";
import { useGameContext } from "../contexts/game";

export default function ChessBoard() {
  const { currentPosition, toWin, onDrop } = useGameContext();

  if (!currentPosition) return <div></div>;

  return (
    <Chessboard
      position={currentPosition}
      onPieceDrop={onDrop}
      customBoardStyle={{
        borderRadius: "4px",
      }}
      customLightSquareStyle={{
        backgroundColor: "#edeed1",
      }}
      customDarkSquareStyle={{
        backgroundColor: "#538d4e",
      }}
      boardOrientation={toWin.toLocaleLowerCase() as "white" | "black"}
    />
  );
}
