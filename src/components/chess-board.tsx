import { Chessboard } from "react-chessboard";
import useGame from "../hooks/use-game";
import React from "react";

export default function ChessBoard() {
  const { initialPosition: position } = useGame();

  const ChessImage = React.memo(() => {
    return <Chessboard position={position} />;
  });

  return (
    <>
      <ChessImage />
    </>
  );
}
