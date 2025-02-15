import { test, describe, expect } from "vitest";
import { addMove, compareGuessToSolution, pvToSan, removeLastMove } from "../src/contexts/utils";
import { formatEmojiString } from "../src/components/stats_modal/utils";

describe("Game", () => {
  test("Compares current guess to solution, all correct", () => {
    const currentGuessMoves = ["a1", "b2", "c3", "d4"];
    const solution = ["a1", "b2", "c3", "d4"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([0, 1, 2, 3]);
    expect(result.incorrectButIncludedMoves).toEqual([]);
  });

  test("Compares current guess to solution, none correct", () => {
    const currentGuessMoves = ["a2", "b3", "c4", "d5"];
    const solution = ["a1", "b2", "c3", "d4"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([]);
    expect(result.incorrectButIncludedMoves).toEqual([]);
  });

  test("Compares current guess to solution, partially correct", () => {
    const currentGuessMoves = ["a1", "d4", "c4", "b2"];
    const solution = ["a1", "b2", "c3", "d4"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([0]);
    expect(result.incorrectButIncludedMoves).toEqual([1, 3]);
  });

  test("Compares current guess to solution, partially correct with duplicate move", () => {
    const currentGuessMoves = ["a1", "d4", "c4", "b2"];
    const solution = ["a1", "a1", "c3", "d4"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([0]);
    expect(result.incorrectButIncludedMoves).toEqual([3]);
  });

  test("Compares current guess to solution, partially correct with earlier duplicate move", () => {
    const currentGuessMoves = ["d4", "a1", "c4", "b2"];
    const solution = ["a1", "a1", "c3", "d4"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([1]);
    expect(result.incorrectButIncludedMoves).toEqual([3]);
  });

  test("Allows any checkmate as long as rest of sequence is correct", () => {
    const currentGuessMoves = ["a1", "b2", "c3", "d5#"];
    const solution = ["a1", "b2", "c3", "d4#"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([0, 1, 2, 3]);
    expect(result.incorrectButIncludedMoves).toEqual([]);
  });

  test("Disallows just any checkmate if rest of sequence is incorrect", () => {
    const currentGuessMoves = ["a2", "b3", "c4", "d5#"];
    const solution = ["a1", "b2", "c3", "d4#"];
    const numberOfMovesPerGuess = 4;
    const result = compareGuessToSolution(currentGuessMoves, solution, numberOfMovesPerGuess);
    expect(result.correctMoves).toEqual([]);
    expect(result.incorrectButIncludedMoves).toEqual([]);
  });

  test("Adds final move", () => {
    const currentGuessMoves = ["a1", "b2", "c3", ""];
    const result = addMove(currentGuessMoves, "d4");
    expect(result).toEqual(["a1", "b2", "c3", "d4"]);
  });

  test("Adds first move", () => {
    const currentGuessMoves = ["", "", "", ""];
    const result = addMove(currentGuessMoves, "a1");
    expect(result).toEqual(["a1", "", "", ""]);
  });

  test("Adds no move", () => {
    const currentGuessMoves = ["a1", "b2", "c3", "d4"];
    const result = addMove(currentGuessMoves, "e5");
    expect(result).toEqual(undefined);
  });

  test("Undoes final move", () => {
    const currentGuessMoves = ["a1", "b2", "c3", "c4"];
    const result = removeLastMove(currentGuessMoves);
    expect(result).toEqual(["a1", "b2", "c3", ""]);
  });

  test("Undoes first move", () => {
    const currentGuessMoves = ["a1", "", "", ""];
    const result = removeLastMove(currentGuessMoves);
    expect(result).toEqual(["", "", "", ""]);
  });

  test("Undoes no move", () => {
    const currentGuessMoves = ["", "", "", ""];
    const result = removeLastMove(currentGuessMoves);
    expect(result).toEqual(undefined);
  });

  test("Converts pawn move notation from PV to SAN", () => {
    const pv = ["a2a3"]
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const result = pvToSan(pv, fen);
    expect(result).toEqual(["a3"]);
  })
});

describe("Game results", () => {
  test("Formats game result emojis correctly", () => {
    const solution = ["a1", "b2", "c3", "d4"];
    const allGuesses = [
      ["a2", "b3", "c4", "d5"],
      ["a1", "b2", "d4", "c3"],
      ["a1", "b2", "c3", "d4"],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ]
    const guessResults = allGuesses.map(guess => compareGuessToSolution(guess, solution, 4));
    const result = formatEmojiString(allGuesses, guessResults);
    expect(result).toEqual("⬛⬛⬛⬛\n🟩🟩🟨🟨\n🟩🟩🟩🟩\n");
  });
})