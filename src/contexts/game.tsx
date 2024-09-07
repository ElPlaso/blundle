import { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import {
  getCurrentGame,
  getGameHistory,
  saveGame,
  setCurrentGame,
} from "../lib/history";
import { GuessResults, SavedGame } from "../lib/types";
import { compareGuessToSolution, GameContext, undoLastMove } from "./utils";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const MAX_GUESSES = 6;

  const [currentGuessMoves, setCurrentGuessMoves] = useState<string[]>([]);
  const [allGuesses, setAllGuesses] = useState<string[][]>([]);

  const [numberOfSubmissions, setNumberOfSubmissions] = useState<number>(0);
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
    if (
      isSolved ||
      isLost ||
      currentGuessMoves!.findIndex((move) => move === "") === -1
    ) {
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

  useEffect(() => {
    async function fetchPuzzle() {
      const url = "https://lichess.org/api/puzzle/daily";
      const response = await fetch(url);
      const puzzle = await response.json();

      const loadedGame = new Chess();
      loadedGame.loadPgn(puzzle.game.pgn);

      position.current = loadedGame.fen();
      setToWin(loadedGame.turn() === "w" ? "White" : "Black");

      // set solution
      const solutionGame = new Chess(position.current);
      const loadedSolution = [];

      const solutionLength = puzzle.puzzle.solution.length;

      numberOfMovesPerGuess.current = solutionLength;

      const currentSetGame: SavedGame | null = getCurrentGame();

      if (currentSetGame && currentSetGame.id === puzzle.game.id) {
        const reloadedGame = new Chess(loadedGame.fen());

        for (let i = 0; i < currentSetGame.currentGuess.length; i++) {
          if (currentSetGame.currentGuess[i] === "") break;
          reloadedGame.move(currentSetGame.currentGuess[i]);
        }

        game.current = reloadedGame;

        setCurrentGuessMoves(currentSetGame.currentGuess);
        setAllGuesses(currentSetGame.allGuesses);
        setGuessResults(currentSetGame.guessResults);
        setNumberOfSubmissions(currentSetGame.numberOfSubmissions);
        setIsSolved(currentSetGame.didWin);
        setIsLost(currentSetGame.didFinish && !currentSetGame.didWin);

        solution.current = currentSetGame.solution;
        position.current = currentSetGame.fen;
      } else {
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

        for (let i = 0; i < solutionLength; i++) {
          const move = puzzle.puzzle.solution[i];
          // get potential promotion
          const promotion = solutionLength === 5 ? move.slice(4, 5) : "q";
          const moveObject = {
            from: move.slice(0, 2),
            to: move.slice(2, 4),
            promotion: promotion,
          };
          const result = solutionGame.move(moveObject);
          if (result) {
            loadedSolution.push(result.san);
          }
        }

        solution.current = loadedSolution;

        setCurrentGame({
          id: puzzle.game.id,
          fen: position.current,
          solution: solution.current,
          currentGuess: prefilledCurrentGuessMoves,
          allGuesses: prefilledAllGuesses,
          numberOfSubmissions,
          didWin: isSolved,
          didFinish: isSolved || isLost,
          guessResults,
        });
      }
      setCurrentPosition(game.current.fen());
    }

    fetchPuzzle();
  }, [guessResults, isLost, isSolved, numberOfSubmissions]);

  useEffect(() => {
    const gameToUpdate: SavedGame | null = getCurrentGame();
    if (gameToUpdate && currentPosition) {
      const currentGame: SavedGame = {
        id: gameToUpdate.id,
        fen: currentPosition,
        solution: solution.current,
        currentGuess: currentGuessMoves,
        allGuesses,
        numberOfSubmissions,
        didWin: isSolved,
        didFinish: isSolved || isLost,
        guessResults: guessResults,
      };

      setCurrentGame(currentGame);

      const history = getGameHistory();

      if (
        (isSolved || isLost) &&
        (history.length === 0 ||
          history[history.length - 1].id != gameToUpdate.id)
      ) {
        saveGame(currentGame);
      }
    }
  }, [
    currentPosition,
    guessResults,
    isSolved,
    isLost,
    currentGuessMoves,
    allGuesses,
    numberOfSubmissions,
  ]);

  const makeGuessMove = (guessMove: string) => {
    const currentGuessMovesCopy = [...currentGuessMoves!];
    const emptyIndex = currentGuessMovesCopy.findIndex((move) => move === "");
    if (emptyIndex === -1) return;
    currentGuessMovesCopy[emptyIndex] = guessMove;
    setCurrentGuessMoves(currentGuessMovesCopy);
  };

  const removeLastGuessMove = () => {
    const movesWithLastRemoved = undoLastMove(currentGuessMoves);
    setCurrentGuessMoves(movesWithLastRemoved);
    game.current.undo();
    setCurrentPosition(game.current.fen());
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
    game.current.load(position.current!);
    setCurrentPosition(game.current.fen());
  };

  const getSolution = () => {
    return solution.current;
  };

  const value = {
    currentPosition,
    numberOfSubmissions,
    isSolved,
    isLost,
    toWin,
    currentGuessMoves,
    allGuesses,
    guessResults,
    getSolution,
    makeGuessMove,
    removeLastGuessMove,
    submitGuess,
    onDrop,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
