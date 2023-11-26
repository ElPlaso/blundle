import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
import { BarChart, Close, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useGameContext } from "../contexts/game";
import { getGameHistory } from "../lib/history";
import { SavedGame } from "../lib/types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StatsModal() {
  const [open, setOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const {
    isSolved,
    isLost,
    guessResults,
    allGuesses,
    numberOfSubmissions,
    getSolution,
  } = useGameContext();

  const toggleOpen = () => setOpen((prev) => !prev);

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

    shareString += "#chesspuzzle";

    // copy to clipboard
    navigator.clipboard.writeText(shareString);

    setShowSnackbar(true);
  };

  useEffect(() => {
    if (isSolved || isLost) {
      setOpen(true);
    }
  }, [isSolved, isLost]);

  const history: SavedGame[] = getGameHistory();

  const numberOfGamesPlayed = history.length;

  const wonGames = history.filter((game) => game.didWin);

  const winPercentage = Math.round(
    (wonGames.length / numberOfGamesPlayed) * 100
  );

  const averageNumberOfGuesses =
    Math.round(
      history.reduce((acc, game) => acc + game.numberOfSubmissions, 0) /
        history.length
    ) || null;

  return (
    <div>
      <IconButton size="large" onClick={toggleOpen} disableRipple>
        <BarChart fontSize="large" className="text-black dark:text-white" />
      </IconButton>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={toggleOpen}
        aria-labelledby="dialog"
        TransitionComponent={Transition}
      >
        <div className="lg:w-[504px] flex flex-col items-center dark:bg-darkBackground">
          <DialogTitle className="flex w-full justify-between items-center">
            <h2 className="text-xl font-bold dark:text-white">STATISTICS</h2>
            <IconButton onClick={toggleOpen} disableRipple>
              <Close className="text-black dark:text-white" />
            </IconButton>
          </DialogTitle>
          <DialogContent className="flex flex-col w-full gap-y-8">
            <DialogContentText className="flex w-full justify-between">
              <div className="flex flex-col items-center text-black dark:text-white">
                <span className="text-3xl font-semi-bold">
                  {numberOfGamesPlayed}
                </span>
                Played
              </div>
              <div className="flex flex-col items-center text-black dark:text-white">
                <span className="text-3xl font-semi-bold">{winPercentage}</span>
                Win %{" "}
              </div>
              <div className="flex flex-col items-center text-black dark:text-white">
                <span className="text-3xl font-semi-bold">
                  {averageNumberOfGuesses ?? "-"}
                </span>
                Average
              </div>
            </DialogContentText>
            <DialogContentText className="flex flex-col justify-center items-center gap-y-2">
              <h2 className="text-3xl font-bold text-black dark:text-white">
                {isSolved ? "You win!" : isLost ? "You lose!" : "Playing..."}
              </h2>
              {(isSolved || isLost) && (
                <div className="text-lightAbsent">
                  Solution: {getSolution().join(" ")}
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleShare}
              className="flex gap-x-4 bg-lightCorrect dark:bg-darkCorrect rounded px-4 py-2 shadow cursor-pointer text-white disabled:bg-opacity-50 disabled:cursor-not-allowed mb-4"
              disabled={!isSolved && !isLost}
            >
              Share
              <Share />
            </button>
          </DialogActions>
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message="Copied results to clipboard"
      />
    </div>
  );
}
