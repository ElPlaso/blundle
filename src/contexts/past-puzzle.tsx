import { useState, useEffect, useRef, useCallback } from "react";
import { Chess } from "chess.js";
import { GuessResults } from "../lib/types";
import {
  addMove,
  compareGuessToSolution,
  GameContext,
  notationToMove,
  pvToSan,
  removeLastMove,
} from "./utils";

// TODO: DRY up
export function PastPuzzleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const MAX_GUESSES = 6;

  const [currentGuessMoves, setCurrentGuessMoves] = useState<string[]>([]);
  const [allGuesses, setAllGuesses] = useState<string[][]>([]);

  const [numberOfSubmissions, setNumberOfSubmissions] = useState<number>(0);
  const [isPuzzleLoading, setIsPuzzleLoading] = useState<boolean>(true);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isLost, setIsLost] = useState<boolean>(false);

  const game = useRef<Chess>(new Chess());
  const position = useRef<string | null>(null);
  const solution = useRef<string[]>([]);
  const numberOfMovesPerGuess = useRef<number>(0);
  const [currentPosition, setCurrentPosition] = useState<string | null>(null);
  const [toWin, setToWin] = useState<"White" | "Black">(
    "White" as "White" | "Black"
  );
  const [puzzleNumber, setPuzzleNumber] = useState<number | null>(null);
  const [originalPosition, setOriginalPosition] = useState<string | null>(null);

  const [guessResults, setGuessResults] = useState<GuessResults[]>(
    Array.from({ length: MAX_GUESSES }, () => {
      return { correctMoves: [], incorrectButIncludedMoves: [] };
    })
  );

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    const result = game.current.move(move);
    setCurrentPosition(game.current.fen());
    return result;
  }

  function onDrop(
    sourceSquare: string,
    targetSquare: string,
    promotionPiece?: string
  ) {
    if (currentGuessMoves!.findIndex((move) => move === "") === -1) {
      return false;
    }

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: promotionPiece || "q",
    });

    if (move === null) return false;

    makeGuessMove(move.san);
    return true;
  }

  const fetchPuzzle = useCallback(async () => {
    const url = import.meta.env.VITE_HISTORIC_CHESS_PUZZLE_URL;
    setIsPuzzleLoading(true);
    const response = await fetch(url);
    setIsPuzzleLoading(false);

    const puzzleEntry = await response.json();

    setPuzzleNumber(puzzleEntry.key);

    const puzzle = puzzleEntry.puzzle;

    const loadedGame = new Chess(puzzle.fen);

    // make first move
    loadedGame.move(notationToMove(puzzle.moves[0]));

    position.current = loadedGame.fen();

    setOriginalPosition(position.current);

    setToWin(loadedGame.turn() === "w" ? "White" : "Black");

    // removes leading move
    const puzzleMoves = puzzle.moves as Array<string>;
    puzzleMoves.shift();

    const solutionLength = puzzleMoves.length;

    numberOfMovesPerGuess.current = solutionLength;

    game.current = loadedGame;

    const prefilledCurrentGuessMoves = Array.from(
      { length: numberOfMovesPerGuess.current },
      () => ""
    );
    setCurrentGuessMoves(prefilledCurrentGuessMoves);

    const prefilledAllGuesses = Array.from({ length: MAX_GUESSES }, () =>
      Array.from({ length: numberOfMovesPerGuess.current }, () => "")
    );

    setAllGuesses(prefilledAllGuesses);

    const puzzleMovesSan = pvToSan(puzzleMoves, loadedGame.fen());

    solution.current = puzzleMovesSan;

    setCurrentPosition(game.current.fen());
  }, []);

  useEffect(() => {
    fetchPuzzle();
  }, [fetchPuzzle]);

  const makeGuessMove = (guessMove: string) => {
    const movesWithMoveAdded = addMove(currentGuessMoves, guessMove);
    if (!movesWithMoveAdded) return;
    if (isSolved || isLost) return;
    setCurrentGuessMoves(movesWithMoveAdded);
  };

  const removeLastGuessMove = () => {
    if (
      currentGuessMoves.every((move) => move === "") &&
      !isSolved &&
      !isLost
    ) {
      return;
    }

    game.current.undo();
    setCurrentPosition(game.current.fen());

    const movesWithLastRemoved = removeLastMove(currentGuessMoves);
    if (!movesWithLastRemoved) return;
    setCurrentGuessMoves(movesWithLastRemoved);
  };

  const submitGuess = () => {
    if (numberOfSubmissions === MAX_GUESSES) return;
    setAllGuesses((previous) => {
      previous[numberOfSubmissions] = currentGuessMoves;
      return previous;
    });
    setNumberOfSubmissions((previous) => previous + 1);
    const result = compareGuessToSolution(
      currentGuessMoves,
      solution.current,
      numberOfMovesPerGuess.current
    );
    setGuessResults((previous) => {
      previous[numberOfSubmissions] = result;
      return previous;
    });
    // clear current guess moves
    setCurrentGuessMoves(
      Array.from({ length: numberOfMovesPerGuess.current }, () => "")
    );

    if (result.correctMoves.length === numberOfMovesPerGuess.current) {
      setIsSolved(true);
      return;
    } else if (numberOfSubmissions === MAX_GUESSES - 1) {
      setIsLost(true);
      return;
    }

    // reset board
    if (originalPosition) {
      game.current.load(originalPosition);
      setCurrentPosition(game.current.fen());
    }
  };

  const getSolution = () => {
    return solution.current;
  };

  const skipPuzzle = useCallback(() => {
    setCurrentPosition(null);
    setCurrentGuessMoves(
      Array.from({ length: numberOfMovesPerGuess.current }, () => "")
    );
    setAllGuesses(
      Array.from({ length: MAX_GUESSES }, () =>
        Array.from({ length: numberOfMovesPerGuess.current }, () => "")
      )
    );
    setIsLost(false);
    setIsSolved(false);
    setNumberOfSubmissions(0);
    setGuessResults(
      Array.from({ length: MAX_GUESSES }, () => ({
        correctMoves: [],
        incorrectButIncludedMoves: [],
      }))
    );
    fetchPuzzle();
  }, [fetchPuzzle]);

  const value = {
    currentPosition,
    numberOfSubmissions,
    isPuzzleLoading,
    isSolved,
    isLost,
    toWin,
    puzzleNumber,
    currentGuessMoves,
    allGuesses,
    guessResults,
    getSolution,
    makeGuessMove,
    removeLastGuessMove,
    submitGuess,
    onDrop,
    skipPuzzle,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
