import StatsModal from "./stats-modal";

export default function TopAppBar() {
  return (
    <header className="sticky w-full top-0 bg-[#213547] text-white shadow-md z-10 max-h-16 flex justify-between items-center flex-1">
      <span className="flex-1"></span>
      <h1 className="flex-1">ChessPuzzle</h1>
      <div className="flex-1">
        <StatsModal />
      </div>
    </header>
  );
}
