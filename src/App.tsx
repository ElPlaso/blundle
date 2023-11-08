import "./App.css";
import ChessBoard from "./components/chess-board";
import GuessingArea from "./components/guessing-area";
import { GameProvider } from "./contexts/game";

function App() {
  return (
    <GameProvider>
      <h1>ChessPuzzle</h1>
      <div style={{ width: "540px", margin: "auto" }}>
        <div
          style={{
            width: "100%",
            height: "540px",
            marginBottom: "25px",
          }}
        >
          <ChessBoard />
        </div>
        <GuessingArea />
      </div>
    </GameProvider>
  );
}

export default App;
