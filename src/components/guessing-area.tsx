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
    }) => (
      <div
        key={props.index}
        className={`border-2 border-[#213547] w-full flex justify-center items-center h-20 font-bold transition-all duration-500 ${
          guessResults[props.guessIndex].correctMoves.includes(props.index)
            ? "bg-green-600"
            : guessResults[props.guessIndex].incorrectButIncludedMoves.includes(
                props.index
              )
            ? "bg-yellow-600"
            : props.move !== ""
            ? "bg-[#213547]"
            : ""
        } ${props.move !== "" && "text-white"}`}
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
            />
          ))}
        </div>
      );
    }
  );

  return (
    <div className="flex flex-col gap-y-2">
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
