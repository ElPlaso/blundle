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
  isPuzzleLoading: boolean;
  isSolved: boolean;
  isLost: boolean;
  toWin: "White" | "Black";
  puzzleNumber: number | null;
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
  skipPuzzle?: () => void;
}

export interface PastPuzzlesResultsContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}
