import { Portal } from "@mui/material";
import { useState } from "react";
import Toast from "../shared/Toast";
import { useGameContext } from "../../contexts/utils";

export default function Submit() {
  const { submitGuess, currentGuessMoves, isSolved, isLost } = useGameContext();
  const [showToast, setShowToast] = useState(false);

  const [animating, setAnimating] = useState(false);

  const handleEnter = () => {
    if (animating) return;
    if (!currentGuessMoves.includes("")) {
      submitGuess();
    } else if (!isSolved && !isLost) {
      setShowToast(true);
      // add animation
      setAnimating(true);
      document.getElementById("current-guess")?.classList.add("animate-shake");
      setTimeout(() => {
        document
          .getElementById("current-guess")
          ?.classList.remove("animate-shake");
        setAnimating(false);
      }, 1000);
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 font-semibold text-white rounded shadow cursor-pointer bg-lightCorrect dark:bg-darkCorrect disabled:bg-opacity-50 disabled:cursor-not-allowed"
        onClick={handleEnter}
      >
        Enter
      </button>
      <Portal>
        <Toast
          message={"Not enough moves!"}
          isOpen={showToast}
          onClose={() => {
            setShowToast(false);
          }}
        />
      </Portal>
    </>
  );
}
