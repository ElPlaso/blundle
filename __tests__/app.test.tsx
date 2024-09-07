import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import React from "react";
import TileRow from "../src/components/guessing_area/tile-row";
import { GameContext, intitialGameState } from "../src/contexts/utils";

describe("App", () => {
  test("App mounts properly", () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();

    // Get by text using the React testing library
    const text = screen.getByText(/Blundle/i);
    expect(text.textContent).toBeTruthy();
  });

  test("Guessing area tile row is rendered properly", () => {
    const guess = ["a1", "b2", "c3", "d4"];
    const wrapper = render(
      <GameContext.Provider value={intitialGameState}>
        <TileRow guessIndex={0} list={guess} />
      </GameContext.Provider>
    );
    expect(wrapper).toBeTruthy();

    for (const move of guess) {
      const text = screen.getByText(move);
      expect(text.textContent).toBeTruthy();
    }
  });
});
