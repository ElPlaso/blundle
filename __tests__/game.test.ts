import { test, describe, expect } from "vitest";
import { compareGuessToSolution } from "../src/contexts/utils";
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