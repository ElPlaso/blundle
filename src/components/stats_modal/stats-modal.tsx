import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { LeaderboardOutlined } from "@mui/icons-material";
import { useMemo } from "react";
import { useGameContext } from "../../contexts/game";
import { getGameHistory } from "../../lib/history";
import { SavedGame } from "../../lib/types";
import Modal from "./../shared/Modal";
import Share from "./share";

export default function StatsModal() {
  const { isSolved, isLost, getSolution } = useGameContext();

  const isOpen = useMemo(() => isSolved || isLost, [isSolved, isLost]);

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
      <Modal
        icon={
          <LeaderboardOutlined
            fontSize="large"
            className="text-black dark:text-white"
          />
        }
        title="STATISTICS"
        isOpen={isOpen}
      >
        <DialogContent className="flex flex-col w-full gap-y-8">
          <DialogContentText className="flex w-full justify-between">
            <span className="flex flex-col items-center text-black dark:text-white">
              <span className="text-3xl font-semi-bold">
                {numberOfGamesPlayed}
              </span>
              Played
            </span>
            <span className="flex flex-col items-center text-black dark:text-white">
              <span className="text-3xl font-semi-bold">
                {winPercentage ?? "0"}
              </span>
              Win %{" "}
            </span>
            <span className="flex flex-col items-center text-black dark:text-white">
              <span className="text-3xl font-semi-bold">
                {averageNumberOfGuesses ?? "0"}
              </span>
              Average
            </span>
          </DialogContentText>
          <DialogContentText className="flex flex-col justify-center items-center gap-y-2">
            <span className="text-3xl font-bold text-black dark:text-white">
              {isSolved ? "You win!" : isLost ? "You lose!" : "Playing..."}
            </span>
            {(isSolved || isLost) && (
              <span className="text-lightAbsent">
                Solution: {getSolution().join(" ")}
              </span>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Share />
        </DialogActions>
      </Modal>
    </>
  );
}
