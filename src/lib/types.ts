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