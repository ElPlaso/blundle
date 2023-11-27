import { memo, useEffect, useRef, useState } from "react";
import { useGameContext } from "../contexts/game";

export default function GuessingArea() {
  const { currentGuessMoves, numberOfSubmissions, allGuesses, guessResults } =
    useGameContext();

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

  const TileComponent = memo(
    (props: {
      move: string;
      index: number;
      guessIndex: number;
      guessLength: number;
      isCurrentGuess: boolean;
    }) => (
      <div
        key={props.index}
        className={`border-2 rounded w-full flex justify-center lg:h-[77.5px] md:h-[43.4px] sm:h-[43.4px] max-sm:h-[50px] items-center font-bold transition-colors duration-500 ${
          props.isCurrentGuess && props.move !== ""
            ? "text-darkAbsent border-lightAbsent dark:text-white"
            : guessResults[props.guessIndex].correctMoves.includes(props.index)
            ? "bg-lightCorrect border-lightCorrect text-white dark:bg-darkCorrect dark:border-darkCorrect"
            : guessResults[props.guessIndex].incorrectButIncludedMoves.includes(
                props.index
              )
            ? "bg-lightPresent border-lightPresent text-white dark:bg-darkPresent dark:border-darkPresent"
            : props.move !== ""
            ? "bg-lightAbsent border-lightAbsent dark:bg-darkAbsent dark:border-darkAbsent text-white"
            : "border-lightSecondary dark:border-darkAbsent"
        }
        ${
          props.isCurrentGuess &&
          props.move !== "" &&
          props.index === currentFilledTilesCount - 1 &&
          hasIncreased.current &&
          "animate-pulse-short"
        }
        `}
      >
        {props.move}
      </div>
    )
  );

  const TileRowComponent = memo(
    (props: { list: string[]; guessIndex: number; guessLength: number }) => {
      return (
        <div className="flex gap-x-2">
          {props.list.map((move, index) => (
            <TileComponent
              move={move}
              index={index}
              key={index}
              guessIndex={props.guessIndex}
              guessLength={props.guessLength}
              isCurrentGuess={props.guessIndex === numberOfSubmissions}
            />
          ))}
        </div>
      );
    }
  );

  return (
    <div className="flex flex-col gap-y-2 h-full">
      {allGuesses.map((guess, index) => (
        <div key={index}>
          <TileRowComponent
            list={index === numberOfSubmissions ? currentGuessMoves : guess}
            guessIndex={index}
            guessLength={guess.length}
          />
        </div>
      ))}
    </div>
  );
}
