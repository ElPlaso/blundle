import { PastPuzzleProvider } from "../../contexts/past-puzzle";
import { useGameContext } from "../../contexts/utils";
import Actions from "../actions/actions";
import ChessBoard from "../chess-board";
import GuessingArea from "../guessing_area/guessing-area";
import PastPuzzleResultsModal from "./past-puzzle-results-modal";
import PastPuzzlesSubheading from "./past_puzzles_subheading";
import PastPuzzlesTopAppBar from "./past-puzzles-top-app-bar";
import { PastPuzzlesResultsProvider } from "../../contexts/past-puzzles-results";

export default function PastPuzzles() {
  const { puzzleNumber } = useGameContext();

  return (
    <PastPuzzleProvider>
      <PastPuzzlesResultsProvider>
        <PastPuzzlesTopAppBar />
        <div className="flex flex-col m-4 gap-y-2">
          {puzzleNumber}
          <PastPuzzlesSubheading />
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
        <PastPuzzleResultsModal />
      </PastPuzzlesResultsProvider>
    </PastPuzzleProvider>
  );
}
