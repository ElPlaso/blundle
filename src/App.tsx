import "./App.css";
import Actions from "./components/actions";
import ChessBoard from "./components/chess-board";
import GuessingArea from "./components/guessing-area";
import Subheading from "./components/subheading";
import TopAppBar from "./components/top-app-bar";
import { GameProvider } from "./contexts/game";

function App() {
  return (
    <GameProvider>
      <TopAppBar />
      <div className="flex flex-col justify-center m-4 gap-y-2">
        <Subheading />
        <div className="flex max-sm:flex-col max-sm:gap-y-4 gap-x-4">
          <div className="flex lg:w-[504px] md:w-[300px] max-sm:w-[250px] flex-col items-center">
            <div className="w-full lg:h-[504px] md:h-[300px] mb-4">
              <ChessBoard />
            </div>
            <Actions />
          </div>
          <div className="lg:w-[504px] lg:h-[504px] md:w-[300px] sm:w-[250px]">
            <GuessingArea />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
