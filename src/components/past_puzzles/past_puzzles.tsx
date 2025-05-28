import { PastPuzzleProvider } from "../../contexts/past-puzzle";
import Actions from "../actions/actions";
import ChessBoard from "../chess-board";
import GuessingArea from "../guessing_area/guessing-area";
import Subheading from "../subheading";

export default function PastPuzzles() {
  return (
    <PastPuzzleProvider>
      <div className="flex flex-col m-4 gap-y-2">
        <Subheading />
        <div className="flex max-sm:flex-col max-sm:gap-y-4 lg:gap-x-4 sm:gap-x-2">
          <div className="flex lg:w-[504px] md:w-[300px] max-sm:w-[250px] flex-col items-center">
            <div className="w-full lg:h-[504px] md:h-[300px] mb-4 shadow-lg bg-[#f5f5f5] dark:bg-darkBackground rounded">
              <ChessBoard />
            </div>
            <Actions />
          </div>
          <div className="lg:w-[504px] lg:h-[504px] md:w-[300px] sm:w-[250px]">
            <GuessingArea />
          </div>
        </div>
      </div>
    </PastPuzzleProvider>
  );
}
