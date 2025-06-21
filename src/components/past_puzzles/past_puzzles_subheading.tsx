import { CircularProgress } from "@mui/material";
import {
  useGameContext,
  usePastPuzzlesResultsContext,
} from "../../contexts/utils";
import { SkipNext } from "@mui/icons-material";
import NextPuzzleButton from "./next-puzzle-button";

export default function PastPuzzlesSubheading() {
  const { toWin, isPuzzleLoading, puzzleNumber, isSolved, isLost } =
    useGameContext();

  const { toggleModal: toggleResultsModal } = usePastPuzzlesResultsContext();

  return (
    <div className="flex items-center justify-between w-full max-sm:flex-col max-sm:gap-y-2">
      <div className="flex justify-start flex-1">
        <div className="font-medium text-lightAbsent">
          Puzzle #{isPuzzleLoading ? "" : puzzleNumber}
        </div>
      </div>
      {isPuzzleLoading ? (
        <h3 className="flex-1 text-lightAbsent">
          <CircularProgress color="inherit" size="24px" />
        </h3>
      ) : (
        <h3 className="flex-1 text-xl font-bold text-lightAbsent">
          {toWin} to play
        </h3>
      )}
      <div className="flex justify-end flex-1">
        {isSolved || isLost ? (
          <button
            onClick={toggleResultsModal}
            className="flex items-center px-4 py-2 text-sm font-bold text-center text-white rounded-full max-sm:hidden w-fit gap-x-2 ijustify-center bg-lightAbsent disabled:cursor-not-allowed dark:bg-darkAbsent"
          >
            Results
          </button>
        ) : (
          <NextPuzzleButton className="flex items-center px-4 py-2 text-sm font-bold text-center text-white rounded-full w-fit gap-x-2 ijustify-center max-sm:hidden bg-lightAbsent disabled:cursor-not-allowed dark:bg-darkAbsent">
            Skip
            <SkipNext fontSize="small" className="text-white" />
          </NextPuzzleButton>
        )}
      </div>
    </div>
  );
}
