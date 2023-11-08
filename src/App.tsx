import "./App.css";
import ChessBoard from "./components/chess-board";
import GuessingArea from "./components/guessing-area";
import { GameProvider } from "./contexts/game";

function App() {
  return (
    <GameProvider>
      <h1>ChessPuzzle</h1>
      <ChessBoard />
      <GuessingArea />
    </GameProvider>
  );
}

export default App;
