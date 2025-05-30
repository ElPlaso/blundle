import { Home } from "@mui/icons-material";
import { Link } from "react-router";

export default function PastPuzzlesTopAppBar() {
  return (
    <header className="sticky top-0 z-10 max-sm:flex-row-reverse flex max-h-16 w-full items-center justify-between border-b-[0.5px] border-b-lightAbsent border-opacity-25 bg-lightBackground py-2 text-black dark:border-b-darkAbsent dark:bg-darkBackground dark:text-white max-sm:px-2">
      <div className="flex items-center justify-center flex-1 gap-x-1 max-sm:flex-none">
        <Link to="/">
          <Home fontSize="large" className="text-black dark:text-white" />
        </Link>
      </div>
      <h1 className="flex-1 text-3xl font-bold max-sm:flex-none flex-nowrap">
        Archive
      </h1>
      <span className="flex-1 max-sm:hidden"></span>
    </header>
  );
}
