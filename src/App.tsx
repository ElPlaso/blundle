import "./App.css";
import Actions from "./components/actions";
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
          }}
        >
          <ChessBoard />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <GuessingArea />
        </div>
        <Actions />
      </div>
    </GameProvider>
  );
}

export default App;
