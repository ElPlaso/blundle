import { createContext, useContext } from "react";
import { GameContextType } from "../lib/types";

export const GameContext = createContext<GameContextType>({
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
});

export function useGameContext() {
    return useContext(GameContext);
}