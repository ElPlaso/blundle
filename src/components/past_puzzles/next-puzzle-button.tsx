import { useGameContext } from "../../contexts/utils";

export default function NextPuzzleButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { skipPuzzle, isPuzzleLoading } = useGameContext();

  return (
    <button
      disabled={isPuzzleLoading}
      className={`${className} ${isPuzzleLoading && "opacity-50"}`}
      onClick={skipPuzzle}
    >
      {children}
    </button>
  );
}
