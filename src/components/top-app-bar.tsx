import InfoModal from "./info_modal/info-modal";
import StatsModal from "./stats-modal";
import ThemeToggle from "./theme-toggle";

export default function TopAppBar() {
  return (
    <header className="sticky py-2 w-full top-0 bg-lightBackground border-opacity-25 dark:bg-darkBackground border-b-[0.5px] border-b-lightAbsent dark:border-b-darkAbsent dark:text-white text-black z-10 max-h-16 flex justify-between items-center max-sm:px-2">
      <span className="flex-1 max-sm:hidden"></span>
      <h1 className="flex-1 max-sm:flex-none font-bold text-3xl">Blundle</h1>
      <div className="flex-1 flex max-sm:flex-none items-center justify-center gap-x-1">
        <InfoModal />
        <StatsModal />
        <ThemeToggle />
      </div>
    </header>
  );
}
