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
      <div style={{ display: "flex", marginTop: "4rem" }}>
        <div
          style={{
            width: "540px",
          }}
        >
          <div style={{ width: "100%", height: "540px", marginBottom: "20px" }}>
            <ChessBoard />
          </div>
          <Subheading />
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
