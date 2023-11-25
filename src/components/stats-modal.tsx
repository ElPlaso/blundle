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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
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

  const numberOfGamesWon = wonGames.length;

  const averageNumberOfGuesses =
    wonGames.reduce((acc, game) => acc + game.numberOfSubmissions, 0) /
      numberOfGamesWon || null;

  return (
    <div>
      <IconButton
        size="large"
        onClick={toggleOpen}
        style={{ color: "white" }}
        disableRipple
      >
        <BarChart fontSize="large" />
      </IconButton>
      <Dialog
        fullScreen={false}
        open={open}
        onClose={toggleOpen}
        aria-labelledby="dialog"
        TransitionComponent={Transition}
      >
        <div className="w-[540px] flex flex-col items-center mb-4">
          <DialogTitle
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <h2>Statistics</h2>
            <IconButton onClick={toggleOpen} disableRipple>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isSolved ? "You win!" : isLost ? "You lose!" : "Playing..."}
              {(isSolved || isLost) && (
                <div>Solution: {getSolution().join(" ")}</div>
              )}
            </DialogContentText>
            <DialogContentText>
              <div>Games Played: {numberOfGamesPlayed}</div>
              <div>Games Won: {numberOfGamesWon}</div>
              <div>
                Average number of guesses: {averageNumberOfGuesses ?? "-"}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleShare}
              className="flex gap-x-4"
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
