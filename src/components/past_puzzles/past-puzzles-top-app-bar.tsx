import { Home, SkipNext } from "@mui/icons-material";

import { Link } from "react-router";
import NextPuzzleButton from "./next-puzzle-button";
import {
  useGameContext,
  usePastPuzzlesResultsContext,
} from "../../contexts/utils";

export default function PastPuzzlesTopAppBar() {
  const { isSolved, isLost } = useGameContext();

  const { toggleModal: toggleResultsModal } = usePastPuzzlesResultsContext();

  return (
    <header className="sticky top-0 z-10 max-sm:flex-row-reverse flex max-h-16 w-full items-center justify-between border-b-[0.5px] border-b-lightAbsent border-opacity-25 bg-lightBackground py-2 text-black dark:border-b-darkAbsent dark:bg-darkBackground dark:text-white max-sm:px-2">
      <div className="flex items-center justify-center flex-1 gap-x-1 max-sm:flex-none">
        <Link to="/">
          <Home fontSize="large" className="text-black dark:text-white" />
        </Link>
        {isSolved || isLost ? (
          <button
            onClick={toggleResultsModal}
            className="flex items-center px-4 py-2 text-sm font-bold text-center text-white rounded-full sm:hidden w-fit gap-x-2 ijustify-center bg-lightAbsent disabled:cursor-not-allowed dark:bg-darkAbsent"
          >
            Results
          </button>
        ) : (
          <NextPuzzleButton className="flex items-center px-4 py-2 text-sm font-bold text-center text-white rounded-full w-fit gap-x-2 ijustify-center sm:hidden bg-lightAbsent disabled:cursor-not-allowed dark:bg-darkAbsent">
            Skip
            <SkipNext fontSize="small" className="text-white" />
          </NextPuzzleButton>
        )}
      </div>
      <h1 className="flex-1 text-3xl font-bold max-sm:flex-none">Archive</h1>
      <span className="flex-1 max-sm:hidden"></span>
    </header>
  );
}
