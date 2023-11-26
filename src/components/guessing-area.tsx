import { memo } from "react";
import { useGameContext } from "../contexts/game";

export default function GuessingArea() {
  const { currentGuessMoves, numberOfSubmissions, allGuesses, guessResults } =
    useGameContext();

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
          props.isCurrentGuess
            ? "text-lightAbsent border-lightSecondary dark:text-darkAbsent dark:border-darkAbsent"
            : guessResults[props.guessIndex].correctMoves.includes(props.index)
            ? "bg-lightCorrect border-lightCorrect text-white dark:bg-darkCorrect dark:border-darkCorrect"
            : guessResults[props.guessIndex].incorrectButIncludedMoves.includes(
                props.index
              )
            ? "bg-lightPresent border-lightPresent text-white dark:bg-darkPresent dark:border-darkPresent"
            : props.move !== ""
            ? "bg-lightAbsent border-lightAbsent dark:bg-darkAbsent dark:border-darkAbsent text-white"
            : "border-lightSecondary dark:border-darkAbsent"
        }`}
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
