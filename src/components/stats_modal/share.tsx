import { ShareOutlined } from "@mui/icons-material";
import { Portal } from "@mui/material";
import { useState } from "react";
import { useGameContext } from "../../contexts/utils";
import Toast from "../shared/Toast";

export default function Share() {
  const { isSolved, isLost, guessResults, allGuesses, numberOfSubmissions } =
    useGameContext();

  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    let shareString = "";

    if (isLost) {
      shareString += "I blundered today's blundle! \n";
    } else if (isSolved) {
      shareString += `I solved today's blundle in ${numberOfSubmissions} ${
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

    shareString += "#blundle https://blundle.online";

    navigator.clipboard.writeText(shareString);

    setShowToast(true);
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={!isSolved && !isLost}
        className="flex justify-center w-48 py-2 text-sm font-bold text-center text-white rounded-full disabled:cursor-not-allowed dark:disabled:bg-darkAbsent disabled:bg-lightAbsent gap-x-2 enabled:bg-lightCorrect enabled:dark:bg-darkCorrect hover:"
      >
        Share
        <ShareOutlined />
      </button>

      <Portal>
        <Toast
          message={"Copied results to clipboard!"}
          isOpen={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        />
      </Portal>
    </>
  );
}
