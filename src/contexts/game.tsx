import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GameContext = createContext<GameContextType>(null as any);

interface GameContextType {
  currentPosition: string | null;
  numberOfSubmissions: number;
  isSolved: boolean;
  isLost: boolean;
  currentGuessMoves: string[];
  allGuesses: string[][];
  guessResults: GuessResults[];
  getSolution: () => string[];
  makeGuessMove: (guessMove: string) => void;
  removeLastGuessMove: () => void;
  submitGuess: () => void;
  onDrop: (sourceSquare: string, targetSquare: string) => boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGameContext() {
  return useContext(GameContext);
}

interface GuessResults {
  correctMoves: number[];
  incorrectButIncludedMoves: number[];
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const MAX_GUESSES = 6;
  const NUM_MOVES_PER_GUESS = 6;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentGuessMoves, setCurrentGuessMoves] = useState<string[]>(
    Array.from({ length: NUM_MOVES_PER_GUESS }, () => "")
  );
  const [allGuesses, setAllGuesses] = useState<string[][]>(
    Array.from({ length: MAX_GUESSES }, () =>
      Array.from({ length: NUM_MOVES_PER_GUESS }, () => "")
    )
  );

  const [numberOfSubmissions, setNumberOfSubmissions] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isLost, setIsLost] = useState<boolean>(false);

  const game = useRef<Chess>(new Chess());
  const position = useRef<string | null>(null);
  const solution = useRef<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState<string | null>(null);

  const [guessResults, setGuessResults] = useState<GuessResults[]>(
    Array.from({ length: MAX_GUESSES }, () => {
      return { correctMoves: [], incorrectButIncludedMoves: [] };
    })
  );

  function makeAMove(move: { from: string; to: string; promotion: string }) {
    const result = game.current.move(move);
    setCurrentPosition(game.current.fen());
    return result;
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (isSolved || currentGuessMoves.findIndex((move) => move === "") === -1) {
      return false;
    }

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
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
      game.current = loadedGame;

      position.current = loadedGame.fen();

      // set solution
      const solutionGame = new Chess(position.current);
      const loadedSolution = [];

      for (let i = 0; i < puzzle.puzzle.solution.length; i++) {
        const move = puzzle.puzzle.solution[i];
        const moveObject = {
          from: move.slice(0, 2),
          to: move.slice(2, 4),
        };
        const result = solutionGame.move(moveObject);
        if (result) {
          loadedSolution.push(result.san);
        }
      }

      solution.current = loadedSolution;

      setCurrentPosition(loadedGame.fen());
    }

    fetchPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeGuessMove = (guessMove: string) => {
    const currentGuessMovesCopy = [...currentGuessMoves];
    const emptyIndex = currentGuessMovesCopy.findIndex((move) => move === "");
    if (emptyIndex === -1) return;
    currentGuessMovesCopy[emptyIndex] = guessMove;
    setCurrentGuessMoves(currentGuessMovesCopy);
  };

  const removeLastGuessMove = () => {
    const currentGuessMovesCopy = [...currentGuessMoves].reverse();
    const lastMoveIndex = currentGuessMovesCopy.findIndex(
      (move) => move !== ""
    );
    if (lastMoveIndex === -1) return;
    currentGuessMovesCopy[lastMoveIndex] = "";
    setCurrentGuessMoves(currentGuessMovesCopy.reverse());
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
    const result = compareGuessToSolution();
    setGuessResults((previous) => {
      previous[numberOfSubmissions] = result;
      return previous;
    });
    // clear current guess moves
    setCurrentGuessMoves(Array.from({ length: NUM_MOVES_PER_GUESS }, () => ""));

    if (result.correctMoves.length === NUM_MOVES_PER_GUESS) {
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

  // return indexes of guess moves that are in the correct position
  // as well as indexes of guess moves that are in the solution but in the wrong position
  const compareGuessToSolution = () => {
    const correctMoves: number[] = [];
    const incorrectButIncludedMoves: number[] = [];

    currentGuessMoves.forEach((move, index) => {
      console.log(move, solution.current[index]);
      if (move === solution.current[index]) {
        correctMoves.push(index);
      } else if (solution.current.includes(move)) {
        incorrectButIncludedMoves.push(index);
      }
    });

    return { correctMoves, incorrectButIncludedMoves };
  };

  const value = {
    currentPosition,
    numberOfSubmissions,
    isSolved,
    isLost,
    currentGuessMoves,
    allGuesses,
    guessResults,
    solution,
    getSolution,
    makeGuessMove,
    removeLastGuessMove,
    submitGuess,
    onDrop,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
