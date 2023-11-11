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

  const { isSolved, isLost, guessResults, allGuesses, numberOfSubmissions } =
    useGameContext();

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
        <div
          style={{
            width: "540px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={handleShare}
              style={{
                display: "flex",
              }}
              disabled={!isSolved && !isLost}
            >
              Share
              <Share style={{ marginLeft: "1rem" }} />
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
