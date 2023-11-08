import { useGameContext } from "../contexts/game";

export default function GuessingArea() {
  const { currentGuessMoves } = useGameContext();

  return (
    <div style={{ display: "flex" }}>
      {currentGuessMoves.map((move, index) => (
        <div
          style={{
            border: "2px",
            padding: "25px",
            backgroundColor: "lightGray",
          }}
        >
          <span key={index}>{move} </span>
        </div>
      ))}
    </div>
  );
}
