import { Portal } from "@mui/material";
import { useGameContext } from "../../contexts/game";
import { useState } from "react";
import Toast from "../shared/Toast";

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
        className="text-white bg-lightCorrect dark:bg-darkCorrect rounded px-4 py-2 shadow cursor-pointer font-semibold disabled:bg-opacity-50 disabled:cursor-not-allowed"
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
