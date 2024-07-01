import { Chessboard } from "react-chessboard";
import { useGameContext } from "../contexts/utils";
import { useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { PromotionPieceOption } from "react-chessboard/dist/chessboard/types";

export default function ChessBoard() {
  const { currentPosition, toWin, onDrop } = useGameContext();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [optionSquares, setOptionSquares] = useState<
    Record<string, Record<string, string>>
  >({});

  function getMoveOptions(square: Square) {
    const game = new Chess(currentPosition!);

    const moves = game.moves({
      square,
      verbose: true,
    });

    const newSquares: Record<string, Record<string, string>> = {};

    moves.map((move: Move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });

    // piece in square
    if (game.get(square)) {
      newSquares[square] = {
        background: "rgba(255, 255, 0, 0.4)",
      };
    }
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: Square) {
    const game = new Chess(currentPosition!);

    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    if (!moveTo) {
      if (square === moveFrom) {
        setMoveFrom(null);
        setMoveTo(null);
        setOptionSquares({});
        return;
      }

      const moves = game.moves({
        square: moveFrom,
        verbose: true,
      });
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );

      if (!foundMove) {
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : null);
        return;
      }

      setMoveTo(square);

      if (
        (foundMove.color === "w" &&
          foundMove.piece === "p" &&
          square[1] === "8") ||
        (foundMove.color === "b" &&
          foundMove.piece === "p" &&
          square[1] === "1")
      ) {
        setShowPromotionDialog(true);
        return;
      }

      const move = game.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });

      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }

      onDrop(moveFrom, square);

      setMoveFrom(null);
      setMoveTo(null);
      setOptionSquares({});
      return;
    }
  }

  function onPromotionPieceSelect(piece: PromotionPieceOption | undefined) {
    if (piece) {
      onDrop(moveFrom!, moveTo!, piece[1].toLowerCase());
    }

    setMoveFrom(null);
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
    return true;
  }

  if (!currentPosition) return <div></div>;

  return (
    <Chessboard
      arePiecesDraggable={false}
      onSquareClick={onSquareClick}
      onPromotionPieceSelect={onPromotionPieceSelect}
      promotionToSquare={moveTo}
      showPromotionDialog={showPromotionDialog}
      position={currentPosition}
      customBoardStyle={{
        borderRadius: "4px",
      }}
      customSquareStyles={{
        ...optionSquares,
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
