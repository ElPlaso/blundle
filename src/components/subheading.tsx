import { useGameContext } from "../contexts/game";

export default function Subheading() {
  const { toWin, currentPosition } = useGameContext();

  if (!currentPosition) return <h3>Loading...</h3>;

  return <h3>{toWin} to win</h3>;
}
