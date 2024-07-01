export interface GuessResults {
  correctMoves: number[];
  incorrectButIncludedMoves: number[];
}

export interface SavedGame {
  id: string;
  didWin: boolean;
  didFinish: boolean;
  numberOfSubmissions: number;
  fen: string;
  solution: string[];
  currentGuess: string[];
  allGuesses: string[][];
  guessResults: GuessResults[];
}

export interface GameContextType {
  currentPosition: string | null;
  numberOfSubmissions: number;
  isSolved: boolean;
  isLost: boolean;
  toWin: "White" | "Black";
  currentGuessMoves: string[];
  allGuesses: string[][];
  guessResults: GuessResults[];
  getSolution: () => string[];
  makeGuessMove: (guessMove: string) => void;
  removeLastGuessMove: () => void;
  submitGuess: () => void;
  onDrop: (
    sourceSquare: string,
    targetSquare: string,
    promotion?: string
  ) => boolean;
}