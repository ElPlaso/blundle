import { ShareOutlined } from "@mui/icons-material";
import { Portal } from "@mui/material";
import { useState } from "react";
import { useGameContext } from "../../contexts/game";
import Toast from "../shared/Toast";

export default function Share() {
  const { isSolved, isLost, guessResults, allGuesses, numberOfSubmissions } =
    useGameContext();

  const [showToast, setShowToast] = useState(false);

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

    setShowToast(true);
  };

  return (
    <>
      <button
        onClick={handleShare}
        disabled={!isSolved && !isLost}
        className="disabled:cursor-not-allowed dark:disabled:bg-darkAbsent disabled:bg-lightAbsent flex text-center font-bold text-sm justify-center gap-x-2 py-2 w-48 text-white enabled:bg-lightCorrect enabled:dark:bg-darkCorrect hover: rounded-full"
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
