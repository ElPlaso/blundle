import InfoModal from "./info_modal/info-modal";
import StatsModal from "./stats_modal/stats-modal";
import ThemeToggle from "./theme-toggle";

export default function TopAppBar() {
  return (
    <header className="sticky top-0 z-10 flex max-h-16 w-full items-center justify-between border-b-[0.5px] border-b-lightAbsent border-opacity-25 bg-lightBackground py-2 text-black dark:border-b-darkAbsent dark:bg-darkBackground dark:text-white max-sm:px-2">
      <span className="flex-1 max-sm:hidden"></span>
      <h1 className="flex-1 text-3xl font-bold max-sm:flex-none">Blundle</h1>
      <div className="flex items-center justify-center flex-1 gap-x-1 max-sm:flex-none">
        <InfoModal />
        <StatsModal />
        <ThemeToggle />
      </div>
    </header>
  );
}
