import { useEffect, useState } from "react";

export default function useGame() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [puzzle, setPuzzle] = useState<any>(null);
  const [currentGuessMoves, setCurrentGuessMoves] = useState<string[]>([]);
  const [numberOfSubmissionsLeft, setNumberOfSubmissionsLeft] =
    useState<number>(6);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPuzzle() {
      const url = "https://lichess.org/api/puzzle/daily";
      const response = await fetch(url);
      const puzzle = await response.json();
      setPuzzle(puzzle);
    }

    fetchPuzzle();
  }, []);

  const makeGuessMove = (guessMove: string) => {
    setCurrentGuessMoves([...currentGuessMoves, guessMove]);
  };

  const removeLastGuessMove = () => {
    setCurrentGuessMoves(
      currentGuessMoves.slice(0, currentGuessMoves.length - 1)
    );
  };

  const getInitialPosition = () => {
    return puzzle?.pgn;
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
    isSolved,
    numberOfSubmissionsLeft,
    getInitialPosition,
    getSolution,
    makeGuessMove,
    removeLastGuessMove,
    submitGuess,
  };
}
