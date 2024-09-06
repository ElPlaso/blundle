import { useState, useRef, useEffect } from "react";
import { useGameContext } from "../../contexts/utils";

export interface TileProps {
  move: string;
  index: number;
  guessIndex: number;
}

export default function Tile(props: TileProps) {
  const { move, index, guessIndex } = props;

  const { numberOfSubmissions, guessResults, currentGuessMoves } =
    useGameContext();

  const isCurrentGuess = guessIndex === numberOfSubmissions;

  const currentFilledTilesCount = currentGuessMoves.filter(
    (move) => move !== ""
  ).length;

  const [prevFilledTilesCount, setPrevFilledTilesCount] = useState(
    currentFilledTilesCount
  );

  const hasIncreased = useRef(false);

  useEffect(() => {
    if (currentFilledTilesCount > prevFilledTilesCount) {
      hasIncreased.current = true;
    } else {
      hasIncreased.current = false;
    }

    setPrevFilledTilesCount(currentFilledTilesCount);
  }, [currentFilledTilesCount, hasIncreased, prevFilledTilesCount]);

  return (
    <div
      key={index}
      className={`border-2 lg:rounded rounded-sm lg:text-lg sm:text-xs max-sm:text-xs max-sm:font-regular w-full flex justify-center lg:h-[77.5px] sm:h-[46.7px] max-sm:h-[50px] items-center font-semibold ${
        isCurrentGuess && move !== ""
          ? "text-darkAbsent border-lightAbsent dark:text-white"
          : guessResults[guessIndex].correctMoves.includes(index)
          ? "bg-lightCorrect border-lightCorrect text-white dark:bg-darkCorrect dark:border-darkCorrect"
          : guessResults[guessIndex].incorrectButIncludedMoves.includes(index)
          ? "bg-lightPresent border-lightPresent text-white dark:bg-darkPresent dark:border-darkPresent"
          : move !== ""
          ? "bg-lightAbsent border-lightAbsent dark:bg-darkAbsent dark:border-darkAbsent text-white"
          : "border-lightSecondary dark:border-darkAbsent"
      }
        ${
          isCurrentGuess &&
          move !== "" &&
          index === currentFilledTilesCount - 1 &&
          hasIncreased.current &&
          "animate-pulse-short"
        }
        `}
    >
      {move}
    </div>
  );
}
