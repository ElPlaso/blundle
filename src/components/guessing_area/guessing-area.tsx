import { useGameContext } from "../../contexts/utils";
import TileRow from "./tile-row";

export default function GuessingArea() {
  const { currentGuessMoves, numberOfSubmissions, allGuesses } =
    useGameContext();

  return (
    <div className="flex flex-col h-full lg:gap-y-2 sm:gap-y-1 max-sm:gap-y-1">
      {allGuesses.map((guess, index) => (
        <div key={index}>
          <TileRow
            list={index === numberOfSubmissions ? currentGuessMoves : guess}
            guessIndex={index}
          />
        </div>
      ))}
    </div>
  );
}
