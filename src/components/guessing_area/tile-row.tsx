import { useGameContext } from "../../contexts/utils";
import Tile from "./tile";

export interface TileRowProps {
  guessIndex: number;
  list: string[];
}

export default function TileRow(props: TileRowProps) {
  const { guessIndex } = props;

  const { numberOfSubmissions } = useGameContext();

  return (
    <div
      id={guessIndex === numberOfSubmissions ? "current-guess" : ""}
      className="flex lg:gap-x-2 sm:gap-x-1 max-sm:gap-x-1"
    >
      {props.list.map((move, index) => (
        <Tile move={move} index={index} key={index} guessIndex={guessIndex} />
      ))}
    </div>
  );
}
