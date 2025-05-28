import { Extension } from "@mui/icons-material";

export default function PastGamesLink() {
  return (
    <button className="hover: flex w-48 justify-center gap-x-2 rounded-full py-2 text-center text-sm font-bold text-white enabled:bg-lightPresent disabled:cursor-not-allowed disabled:bg-lightAbsent enabled:dark:bg-darkPresent dark:disabled:bg-darkAbsent">
      Past Puzzles
      <Extension />
    </button>
  );
}
