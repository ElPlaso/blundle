import { ShareOutlined } from "@mui/icons-material";
import { Portal, Snackbar, SnackbarContent } from "@mui/material";
import { useState } from "react";
import { useGameContext } from "../../contexts/game";

export default function Share() {
  const { isSolved, isLost, guessResults, allGuesses, numberOfSubmissions } =
    useGameContext();

  const [showSnackbar, setShowSnackbar] = useState(false);

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

    navigator.clipboard.writeText(shareString);

    setShowSnackbar(true);
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={!isSolved && !isLost}
        className="flex text-center font-bold text-sm justify-center gap-x-2 py-2 w-48 text-white bg-lightCorrect dark:bg-darkCorrect rounded-full"
      >
        Share
        <ShareOutlined />
      </button>

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
