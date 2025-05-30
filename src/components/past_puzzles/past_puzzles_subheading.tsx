import { CircularProgress } from "@mui/material";
import { useGameContext } from "../../contexts/utils";
import RefreshButton from "./refresh_button";
import { SkipNext } from "@mui/icons-material";

export default function PastPuzzlesSubheading() {
  const { toWin, currentPosition, puzzleNumber } = useGameContext();

  if (!currentPosition)
    return (
      <h3 className="text-lightAbsent">
        <CircularProgress color="inherit" size="24px" />
      </h3>
    );

  return (
    <div className="flex items-center justify-between max-sm:flex-col">
      <div className="font-medium text-lightAbsent">Puzzle #{puzzleNumber}</div>
      <h3 className="text-xl font-bold text-lightAbsent">{toWin} to play</h3>
      <RefreshButton className="flex items-center px-4 py-2 text-sm font-bold text-center text-white rounded-full gap-x-2 ijustify-center max-sm:hidden w-fit hover: bg-lightAbsent disabled:cursor-not-allowed dark:bg-darkAbsent">
        Skip
        <SkipNext fontSize="small" className="text-white" />
      </RefreshButton>
    </div>
  );
}
