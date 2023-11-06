import { Chessboard } from "react-chessboard";
import useGame from "../hooks/use-game";
import React from "react";

export default function ChessBoard() {
  const { initialPosition: position } = useGame();

  if (!position) return <></>;

  const ChessImage = React.memo(() => {
    return <Chessboard position={position} boardWidth={500} />;
  });

  return (
    <>
      <ChessImage />
    </>
  );
}
