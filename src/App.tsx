import "./App.css";
import ChessBoard from "./components/chess-board";
import { GameProvider } from "./contexts/game";

function App() {
  return (
    <GameProvider>
      <h1>ChessPuzzle</h1>
      <ChessBoard />
    </GameProvider>
  );
}

export default App;
