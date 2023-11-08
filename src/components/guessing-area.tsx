import { useGameContext } from "../contexts/game";

export default function GuessingArea() {
  const { currentGuessMoves } = useGameContext();

  return (
    <div style={{ display: "flex" }}>
      {currentGuessMoves.map((move, index) => (
        <div
          className="move-tile"
          key={index}
          style={{
            border: "solid",
            height: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: move !== "" ? "#213547" : "",
            color: move !== "" ? "white" : "",
            fontWeight: "bold",
            borderRadius: "5px",
            transition: "background-color 0.5s",
            marginRight: index != currentGuessMoves.length - 1 ? "10px" : "0px",
          }}
        >
          {move}
        </div>
      ))}
    </div>
  );
}
