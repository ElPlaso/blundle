export type ResultType = "Correct" | "Present" | "Absent";

export interface ResultExampleProps {
  moves: Array<string>;
  position: number;
  type: ResultType;
}

export default function ResultExample(props: ResultExampleProps) {
  const { moves, position, type } = props;

  const subtitle = {
    Correct: "is in the solution and in the correct spot.",
    Present: "is in the solution but in the wrong spot.",
    Absent: "is not in the solution.",
  };

  return (
    <span className="flex flex-col text-lightAbsent gap-y-1">
      <span className="flex text-white gap-x-2">
        {moves.map((move, index) => (
          <span
            key={index}
            className={`p-2 rounded w-16 items-center flex font-bold justify-center ${
              index === position
                ? `bg-light${type} dark:bg-dark${type}`
                : `bg-white text-lightAbsent dark:text-white dark:bg-darkBackground border-2 border-lightAbsetn dark:border-darkAbsent`
            }`}
          >
            {move}
          </span>
        ))}
      </span>
      <span>
        <b>{moves[position]}</b> {subtitle[type]}
      </span>
    </span>
  );
}
