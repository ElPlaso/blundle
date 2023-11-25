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
        <div className="flex">
          <div className="flex flex-col items-center w-[540px]">
            <div className="w-full h-[540px] mb-4">
              <ChessBoard />
            </div>
            <Actions />
          </div>
          <div className="ml-[20px] w-[540px]">
            <GuessingArea />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
