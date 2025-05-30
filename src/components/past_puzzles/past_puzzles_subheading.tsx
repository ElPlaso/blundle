import { CircularProgress } from "@mui/material";
import { useGameContext } from "../../contexts/utils";

export default function PastPuzzlesSubheading() {
  const { toWin, currentPosition, puzzleNumber } = useGameContext();

  if (!currentPosition)
    return (
      <h3 className="text-lightAbsent">
        <CircularProgress color="inherit" size="24px" />
      </h3>
    );

  return (
    <h3 className="text-xl font-bold text-lightAbsent">
      Puzzle #{puzzleNumber} - {toWin} to play
    </h3>
  );
}
