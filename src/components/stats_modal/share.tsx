import { ShareOutlined } from "@mui/icons-material";
import { Portal } from "@mui/material";
import { useState } from "react";
import { useGameContext } from "../../contexts/utils";
import Toast from "../shared/Toast";
import { formatEmojiString } from "./utils";

export default function Share() {
  const {
    isSolved,
    isLost,
    guessResults,
    allGuesses,
    numberOfSubmissions,
    puzzleNumber,
  } = useGameContext();

  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    let shareString = puzzleNumber ? `Blundle #${puzzleNumber} \n` : "";

    if (isLost) {
      shareString += "I blundered today's blundle! \n";
    } else if (isSolved) {
      shareString += `I solved today's blundle in ${numberOfSubmissions} ${
        numberOfSubmissions > 1 ? "tries" : "try"
      }! \n`;
    }

    const emojiString = formatEmojiString(allGuesses, guessResults);

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
        className="hover: flex w-48 justify-center gap-x-2 rounded-full py-2 text-center text-sm font-bold text-white enabled:bg-lightCorrect disabled:cursor-not-allowed disabled:bg-lightAbsent enabled:dark:bg-darkCorrect dark:disabled:bg-darkAbsent"
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
