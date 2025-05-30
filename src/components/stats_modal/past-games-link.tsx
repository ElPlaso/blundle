import { HourglassEmptyOutlined } from "@mui/icons-material";
import { Link } from "react-router";

export default function PastGamesLink() {
  return (
    <Link to="/past-puzzles">
      <button className="flex justify-center w-48 py-2 text-sm font-bold text-center text-white rounded-full hover: gap-x-2 enabled:bg-lightPresent disabled:cursor-not-allowed disabled:bg-lightAbsent enabled:dark:bg-darkPresent dark:disabled:bg-darkAbsent">
        Past Puzzles
        <HourglassEmptyOutlined />
      </button>
    </Link>
  );
}
