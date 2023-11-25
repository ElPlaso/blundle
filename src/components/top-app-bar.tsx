import StatsModal from "./stats-modal";

export default function TopAppBar() {
  return (
    <header className="sticky w-full top-0 bg-white border-opacity-25 dark:bg-darkBackground border-b-[0.5px] border-b-lightAbsent dark:border-b-darkAbsent dark:text-white text-black z-10 max-h-24 flex justify-between items-center flex-1">
      <span className="flex-1"></span>
      <h1 className="flex-1 font-bold text-2xl">ChessPuzzle</h1>
      <div className="flex-1">
        <StatsModal />
      </div>
    </header>
  );
}
