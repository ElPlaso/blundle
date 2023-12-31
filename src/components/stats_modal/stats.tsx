import { getGameHistory } from "../../lib/history";
import { SavedGame } from "../../lib/types";

export default function Stats() {
  const history: SavedGame[] = getGameHistory();

  const numberOfGamesPlayed = history.length;

  const wonGames = history.filter((game) => game.didWin);

  const winPercentage =
    Math.round((wonGames.length / numberOfGamesPlayed) * 100) || null;

  const averageNumberOfGuesses =
    Math.round(
      history.reduce((acc, game) => acc + game.numberOfSubmissions, 0) /
        history.length
    ) || null;

  return (
    <>
      <span className="flex flex-col items-center text-black dark:text-white">
        <span className="text-3xl font-semi-bold">{numberOfGamesPlayed}</span>
        Played
      </span>
      <span className="flex flex-col items-center text-black dark:text-white">
        <span className="text-3xl font-semi-bold">{winPercentage ?? "0"}</span>
        Win %{" "}
      </span>
      <span className="flex flex-col items-center text-black dark:text-white">
        <span className="text-3xl font-semi-bold">
          {averageNumberOfGuesses ?? "0"}
        </span>
        Average
      </span>
    </>
  );
}
