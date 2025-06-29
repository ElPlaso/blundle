import { createContext, useContext } from "react";
import { GameContextType, PastPuzzlesResultsContextType } from "../lib/types";
import { Chess } from "chess.js";

export const intitialGameState: GameContextType = {
  currentPosition: null,
  numberOfSubmissions: 0,
  isPuzzleLoading: false,
  isSolved: false,
  isLost: false,
  toWin: "White",
  puzzleNumber: null,
  currentGuessMoves: [],
  allGuesses: [],
  guessResults: [],
  getSolution: () => [],
  makeGuessMove: () => {},
  removeLastGuessMove: () => {},
  submitGuess: () => {},
  onDrop: () => false,
  skipPuzzle: () => {},
};

export const GameContext = createContext<GameContextType>(intitialGameState);

export function useGameContext() {
  return useContext(GameContext);
}

// return indexes of guess moves that are in the correct position
// as well as indexes of guess moves that are in the solution but in the wrong position
export function compareGuessToSolution(
  currentGuessMoves: string[],
  solution: string[],
  numberOfMovesPerGuess: number
): { correctMoves: number[]; incorrectButIncludedMoves: number[] } {
  const correctMoves: number[] = [];
  const incorrectButIncludedMoves: number[] = [];
  const remainingSolution: string[] = [...solution];

  currentGuessMoves.forEach((move, index) => {
    // allow any checkmate if rest of sequence is correct
    if (
      move === solution[index] ||
      (move.includes("#") && correctMoves.length === numberOfMovesPerGuess - 1)
    ) {
      correctMoves.push(index);
      // remove from remaining solution
      const newIndex = remainingSolution.indexOf(move);
      remainingSolution.splice(newIndex, 1);
    }
  });

  currentGuessMoves.forEach((move, index) => {
    if (remainingSolution.includes(move) && !correctMoves.includes(index)) {
      incorrectButIncludedMoves.push(index);
      // remove from remaining solution
      const newIndex = remainingSolution.indexOf(move);
      remainingSolution.splice(newIndex, 1);
    }
  });

  return { correctMoves, incorrectButIncludedMoves };
}

export function addMove(
  currentGuessMoves: string[],
  guessMove: string
): string[] | undefined {
  const currentGuessMovesCopy = [...currentGuessMoves!];
  const emptyIndex = currentGuessMovesCopy.findIndex((move) => move === "");
  if (emptyIndex === -1) return;
  currentGuessMovesCopy[emptyIndex] = guessMove;
  return currentGuessMovesCopy;
}

export function removeLastMove(
  currentGuessMoves: string[]
): string[] | undefined {
  const currentGuessMovesCopy = [...currentGuessMoves].reverse();
  const lastMoveIndex = currentGuessMovesCopy.findIndex((move) => move !== "");
  if (lastMoveIndex === -1) {
    return;
  }

  currentGuessMovesCopy[lastMoveIndex] = "";

  return currentGuessMovesCopy.reverse();
}

export function notationToMove(move: string) {
  return {
    from: move.slice(0, 2),
    to: move.slice(2, 4),
    promotion: move.length == 5 ? move.slice(4, 5) : undefined,
  };
}

// Ref: https://talkchess.com/viewtopic.php?t=80193
export function pvToSan(pv: Array<string>, fen: string) {
  const game = new Chess(fen);

  const moves = pv;
  const san = [];

  for (let i = 0; i < moves.length; ++i) {
    const move = game.move(notationToMove(moves[i]));
    if (move == null) break;
    san.push(move.san);
  }

  return san;
}

export const intitialPastPuzzlesResultsState: PastPuzzlesResultsContextType = {
  isModalOpen: false,
  toggleModal: () => {},
};

export const PastPuzzlesResultsContext =
  createContext<PastPuzzlesResultsContextType>(intitialPastPuzzlesResultsState);

export function usePastPuzzlesResultsContext() {
  return useContext(PastPuzzlesResultsContext);
}
