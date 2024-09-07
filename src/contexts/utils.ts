import { createContext, useContext } from "react";
import { GameContextType } from "../lib/types";

export const intitialGameState: GameContextType = {
    currentPosition: null,
    numberOfSubmissions: 0,
    isSolved: false,
    isLost: false,
    toWin: "White",
    currentGuessMoves: [],
    allGuesses: [],
    guessResults: [],
    getSolution: () => [],
    makeGuessMove: () => { },
    removeLastGuessMove: () => { },
    submitGuess: () => { },
    onDrop: () => false,
}

export const GameContext = createContext<GameContextType>(intitialGameState);

export function useGameContext() {
    return useContext(GameContext);
}

// return indexes of guess moves that are in the correct position
// as well as indexes of guess moves that are in the solution but in the wrong position
export function compareGuessToSolution(currentGuessMoves: string[], solution: string[], numberOfMovesPerGuess: number): { correctMoves: number[]; incorrectButIncludedMoves: number[] } {
    const correctMoves: number[] = [];
    const incorrectButIncludedMoves: number[] = [];

    currentGuessMoves.forEach((move, index) => {
        // allow any checkmate if rest of sequence is correct
        if (
            move === solution[index] ||
            (move.includes("#") &&
                correctMoves.length === numberOfMovesPerGuess - 1)
        ) {
            correctMoves.push(index);
        } else if (solution.includes(move)) {
            incorrectButIncludedMoves.push(index);
        }
    });

    return { correctMoves, incorrectButIncludedMoves };
}

export function addMove(currentGuessMoves: string[], guessMove: string): string[] | undefined {
    const currentGuessMovesCopy = [...currentGuessMoves!];
    const emptyIndex = currentGuessMovesCopy.findIndex((move) => move === "");
    if (emptyIndex === -1) return;
    currentGuessMovesCopy[emptyIndex] = guessMove;
    return currentGuessMovesCopy;
}

export function removeLastMove(currentGuessMoves: string[]): string[] | undefined {
    const currentGuessMovesCopy = [...currentGuessMoves].reverse();
    const lastMoveIndex = currentGuessMovesCopy.findIndex(
        (move) => move !== ""
    );
    if (lastMoveIndex === -1) {
        return;
    }

    currentGuessMovesCopy[lastMoveIndex] = "";

    return currentGuessMovesCopy.reverse();
}

export function generateSolutionMoves(puzzleSolution: string[]): { from: string; to: string; promotion?: string }[] {
    return puzzleSolution.map((move) => {
        // get potential promotion
        const promotion = move.length === 5 ? move.slice(4, 5) : undefined;
        const moveObject = {
            from: move.slice(0, 2),
            to: move.slice(2, 4),
            promotion,
        };
        return moveObject;
    });
}