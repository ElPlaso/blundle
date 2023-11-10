import { memo } from "react";
import { useGameContext } from "../contexts/game";

export default function GuessingArea() {
  const { currentGuessMoves, numberOfSubmissions, allGuesses, guessResults } =
    useGameContext();

  const TileComponent = memo(
    (props: {
      move: string;
      index: number;
      guessIndex: number;
      guessLength: number;
    }) => (
      <div
        className="move-tile"
        key={props.index}
        style={{
          border: "solid #213547",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: guessResults[props.guessIndex].correctMoves.includes(
            props.index
          )
            ? "green"
            : guessResults[props.guessIndex].incorrectButIncludedMoves.includes(
                props.index
              )
            ? "orange"
            : props.move !== ""
            ? "#213547"
            : "",
          color: props.move !== "" ? "white" : "",
          fontWeight: "bold",
          borderRadius: "5px",
          transition: "background-color 0.5s",
          marginRight: props.index != props.guessLength - 1 ? "5px" : "0px",
        }}
      >
        {props.move}
      </div>
    )
  );

  const TileRowComponent = memo(
    (props: { list: string[]; guessIndex: number; guessLength: number }) => {
      return (
        <>
          {props.list.map((move, index) => (
            <TileComponent
              move={move}
              index={index}
              guessIndex={props.guessIndex}
              guessLength={props.guessLength}
            />
          ))}
        </>
      );
    }
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {allGuesses.map((guess, index) => (
        <div
          style={{
            display: "flex",
            marginBottom: index != allGuesses.length - 1 ? "5px" : "0px",
          }}
        >
          <TileRowComponent
            list={index === numberOfSubmissions ? currentGuessMoves : guess}
            guessIndex={index}
            guessLength={guess.length}
          />
        </div>
      ))}
    </div>
  );
}
