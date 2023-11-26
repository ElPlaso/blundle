import { useGameContext } from "../contexts/game";
import { CircularProgress } from "@mui/material";

export default function Subheading() {
  const { toWin, currentPosition } = useGameContext();

  if (!currentPosition)
    return (
      <h3 className="text-lightAbsent">
        <CircularProgress color="inherit" size="24px" />
      </h3>
    );

  return (
    <h3 className="text-xl text-lightAbsent font-bold">{toWin} to play</h3>
  );
}
