import { useGameContext } from "../contexts/utils";
import { CircularProgress } from "@mui/material";

export default function Subheading() {
  const { toWin, isPuzzleLoading } = useGameContext();

  if (isPuzzleLoading)
    return (
      <h3 className="text-lightAbsent">
        <CircularProgress color="inherit" size="24px" />
      </h3>
    );

  return (
    <h3 className="text-xl font-bold text-lightAbsent">{toWin} to play</h3>
  );
}
