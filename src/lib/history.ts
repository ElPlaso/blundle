import { SavedGame } from "./types";


export function getCurrentGame(): SavedGame | null {
  const currentGame = localStorage.getItem("currentGame");
  if (currentGame) {
    return JSON.parse(currentGame);
  }
  return null;
}

export function setCurrentGame(game: SavedGame) {
  localStorage.setItem("currentGame", JSON.stringify(game));
}

export function getGameHistory(): SavedGame[] {
  const gameHistory = localStorage.getItem("gameHistory");
  if (gameHistory) {
    return JSON.parse(gameHistory);
  }
  return [];
}

export function saveGame(game: SavedGame) {
  const gameHistory = getGameHistory();
  gameHistory.push(game);
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}
