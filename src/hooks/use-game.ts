import { useEffect, useState } from "react";
import { Chess } from "chess.js";

export default function useGame() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [puzzle, setPuzzle] = useState<any>(null);
  const [currentGuessMoves, setCurrentGuessMoves] = useState<string[]>([]);
  const [numberOfSubmissionsLeft, setNumberOfSubmissionsLeft] =
    useState<number>(6);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  const [game, setGame] = useState<Chess | null>(null);

  function makeAMove(move: { from: string; to: string; promotion: string }) {
    const result = game!.move(move);
    setGame(new Chess(game!.fen()));
    return result;
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    return true;
  }

  useEffect(() => {
    async function fetchPuzzle() {
      const url = "https://lichess.org/api/puzzle/daily";
      const response = await fetch(url);
      const puzzle = await response.json();
      setPuzzle(puzzle);

      const game = new Chess();
      game.loadPgn(puzzle.game.pgn);

      setGame(game);
    }

    fetchPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeGuessMove = (guessMove: string) => {
    setCurrentGuessMoves([...currentGuessMoves, guessMove]);
  };

  const removeLastGuessMove = () => {
    setCurrentGuessMoves(
      currentGuessMoves.slice(0, currentGuessMoves.length - 1)
    );
  };

  const getSolution = () => {
    return puzzle?.solution;
  };

  const submitGuess = () => {
    const guess = currentGuessMoves.join(" ");
    const solution = getSolution();
    setNumberOfSubmissionsLeft((previous) => previous - 1);
    if (guess === solution) {
      setIsSolved(true);
    }
    return compareGuessToSolution();
  };

  // return indexes of guess moves that are in the correct position
  // as well as indexes of guess moves that are in the solution but in the wrong position
  const compareGuessToSolution = () => {
    const guess = currentGuessMoves.join(" ");
    const solution = getSolution();
    const guessMoves = guess.split(" ");
    const solutionMoves = solution.split(" ");
    const correctMoves: number[] = [];
    const incorrectMoves: number[] = [];

    guessMoves.forEach((move, index) => {
      if (move === solutionMoves[index]) {
        correctMoves.push(index);
      } else if (solutionMoves.includes(move)) {
        incorrectMoves.push(index);
      }
    });

    return { correctMoves, incorrectMoves };
  };

  return {
    game,
    numberOfSubmissionsLeft,
    isSolved,
    getSolution,
    makeGuessMove,
    removeLastGuessMove,
    submitGuess,
    onDrop,
  };
}
