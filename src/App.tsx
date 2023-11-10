import "./App.css";
import Actions from "./components/actions";
import ChessBoard from "./components/chess-board";
import GuessingArea from "./components/guessing-area";
import { GameProvider } from "./contexts/game";

function App() {
  return (
    <GameProvider>
      <h1>ChessPuzzle</h1>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "540px",
          }}
        >
          <div style={{ width: "100%", height: "540px", marginBottom: "20px" }}>
            <ChessBoard />
          </div>
          <Actions />
        </div>
        <div style={{ marginLeft: "20px", width: "540px" }}>
          <GuessingArea />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
