import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  SnackbarContent,
  Portal,
} from "@mui/material";
import { LeaderboardOutlined, ShareOutlined } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { useGameContext } from "../contexts/game";
import { getGameHistory } from "../lib/history";
import { SavedGame } from "../lib/types";
import Modal from "./shared/Modal";

export default function StatsModal() {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const {
    isSolved,
    isLost,
    guessResults,
    allGuesses,
    numberOfSubmissions,
    getSolution,
  } = useGameContext();

  const handleShare = () => {
    let shareString = "";

    if (isLost) {
      shareString += "I blundered today's chess puzzle! \n";
    } else if (isSolved) {
      shareString += `I solved today's chess puzzle in ${numberOfSubmissions} ${
        numberOfSubmissions > 1 ? "tries" : "try"
      }! \n`;
    }

    let emojiString = "";
    for (let i = 0; i < allGuesses.length; i++) {
      let guessEmojiString = "";
      for (let j = 0; j < allGuesses[i].length; j++) {
        if (guessResults[i].correctMoves.includes(j)) {
          guessEmojiString += "🟩";
        } else if (guessResults[i].incorrectButIncludedMoves.includes(j)) {
          guessEmojiString += "🟨";
        } else {
          guessEmojiString += "⬛";
        }
      }
      emojiString += `${guessEmojiString}\n`;
      if (guessEmojiString === "🟩".repeat(allGuesses[i].length)) {
        break;
      }
    }

    shareString += `${emojiString}`;

    shareString += "#blundle #dailychesspuzzle";

    // copy to clipboard
    navigator.clipboard.writeText(shareString);

    setShowSnackbar(true);
  };

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
          <button
            onClick={handleShare}
            disabled={!isSolved && !isLost}
            className="flex text-center font-bold text-sm justify-center gap-x-2 py-2 w-48 text-white bg-lightCorrect dark:bg-darkCorrect rounded-full"
          >
            Share
            <ShareOutlined />
          </button>
        </DialogActions>
      </Modal>
      <Portal>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
          autoHideDuration={2000}
        >
          <SnackbarContent
            style={{
              backgroundColor:
                localStorage.theme === "light" ? "#6aaa64" : "#538d4e",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
            }}
            message="Copied results to clipboard!"
          />
        </Snackbar>
      </Portal>
    </>
  );
}
